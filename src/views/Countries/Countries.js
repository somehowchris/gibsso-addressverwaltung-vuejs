/* eslint-disable indent */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { mapActions, mapState, mapMutations } from 'vuex';
import CountryService from '@/services/CountryService.js';

export default {
  name: 'countries',
  data: () => ({
    query: undefined,
    originalName: '',
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
      if (this.selectedCountry ? select.id !== this.selectedCountry.id : true) {
        this.countries.forEach((el) => {
          el.selected = false;
        });
        const toSet = this.countries.find(el => el.id === select.id);

        toSet ? (toSet.selected = true) : undefined;

        this.$router.push({ path: this.selectedCountry ? `/countries/${this.selectedCountry.id}` : '/countries' }).catch(() => { });
      }
    },
    unset() {
      this.selectedCountry
        ? (this.selectedCountry.name = this.originalName)
        : undefined;
      this.countries.forEach((el) => {
        el.selected = false;
      });
      this.query = undefined;
      this.originalName = '';
      this.$router.push({ query: undefined, path: '/countries' }).catch(() => { });
    },
    save() {
      !this.selectedCountry
        ? CountryService.createCountry(this.query).then((el) => {
          this.unset();
          this.countries.push(el);
          this.select(el);
        })
        : CountryService.updateCountry(this.selectedCountry, this.selectedCountry.id).then((el) => {
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
      return (minChars = 0) => this.query && this.query.length >= minChars;
    },
    getCountries() {
      return this.query && !this.selectedCountry
        ? this.countries.filter(el => el.name.indexOf(this.query) > -1)
        : this.countries;
    },
  },
  watch: {
    selectedCountry(newVal, oldVal) {
      if (
        oldVal
        && (newVal ? oldVal.id !== newVal.id : true)
        && this.originalName
      ) {
        this.countries.find(el => el.id === oldVal.id).name = this.originalName;
      }
      if (this.selectedCountry) {
        this.query = this.selectedCountry.name;
        if (oldVal && newVal ? oldVal.id !== newVal.id : true) {
          this.originalName = this.selectedCountry.name;
        }
      }
    },
    query() {
      if (this.hasSelected) {
        this.selectedCountry.name = this.query;
      }
      this.$router
        .push({
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
