/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
// TODO move search to store
import { mapActions, mapState, mapMutations } from 'vuex';
import CountryService from '@/services/CountryService';

export default {
  name: 'countries',
  data: () => ({
    query: undefined,
  }),
  async created() {
    await this.loadCountries();
    this.$route.params.id
      ? this.select({ id: this.$route.params.id })
      : undefined;
    this.$route.query.query ? (this.query = this.$route.query.query) : undefined;
  },
  methods: {
    ...mapActions(['loadCountries']),
    ...mapMutations(['setCountries']),
    deleteCountry(country) {
      this.unset();
      CountryService.deleteCountry(country.id)
        .catch(() => { })
        .then(() => {
          this.setCountries(this.countries.filter(el => el.id !== country.id));
        });
    },
    select(select) {
      if (!!this.selectedCountry ? select.id !== this.selectedCountry.id : true) {
        this.countries.forEach((el) => {
          el.selected = false;
        });
        const toSet = this.countries.find(el => el.id === select.id);

        toSet ? (toSet.selected = true) : this.$router.push({ path: '/countries' });
      }
      this.$router.push({ path: `/countries/${this.selectedCountry.id}` }).catch(() => { });
    },
    unset() {
      this.countries.forEach((el) => {
        el.selected = false;
      });
      this.query = undefined;
      this.$router.push({ query: undefined, path: '/countries' }).catch(() => { });
    },
    save() {
      !this.selectedCountry
        ? CountryService.createCountry(this.query).then((el) => {
          this.unset();
          this.countries.push(el);
          this.select(el);
        })
        : CountryService.updateCountry({ name: this.query }, this.selectedCountry.id).then((el) => {
          this.unset();
          // eslint-disable-next-line no-confusing-arrow
          this.setCountries(this.countries.map(country => country.id === el.id ? el : country));
          this.select(el);
        });
    },
  },
  computed: {
    ...mapState(['countries']),
    hasSelected() {
      return this.countries instanceof Array ? this.countries.filter(el => !!el.selected).length > 0 : [];
    },
    selectedCountry() {
      return this.countries instanceof Array ? this.countries.find(el => !!el.selected) : undefined;
    },
    validInput() {
      return (minChars = 0) =>
        this.query
        && this.query.length >= minChars
        && this.query.match(/^[a-zA-ZäöüÄÖÜ -]{2,}$/)
        && (!this.countries ? true : this.countries.filter(el =>
          (this.hasSelected ? (this.selectedCountry.name === this.query ? false : el.name === this.query) : el.name === this.query)).length === 0);
    },
    getCountries() {
      return this.query && !this.selectedCountry
        ? this.countries.filter(el => el.name.indexOf(this.query) > -1)
        : this.countries;
    },
  },
  watch: {
    selectedCountry() {
      if (this.selectedCountry) {
        this.query = this.selectedCountry.name;
      }
    },
    query() {
      this.$router
        .push({
          path: this.selectedCountry ? `/countries/${this.selectedCountry.id}` : '/countries',
          query: {
            query:
              this.selectedCountry || !this.query || !this.query.length > 0
                ? undefined
                : this.query,
          },
        })
        .catch(() => { });
    },
  },
};
