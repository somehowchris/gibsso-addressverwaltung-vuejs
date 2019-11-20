import {
  mapActions, mapGetters, mapState, mapMutations,
} from 'vuex';
import BaseDropDown from '../../components/BaseDropdown.vue';
import BaseButton from '../../components/BaseButton.vue';
import PeopleService from '../../services/PeopleService';

export default {
  name: 'People',
  components: {
    BaseDropDown,
    BaseButton,
  },
  data: () => ({
    next: undefined,
    previous: undefined,
    person: undefined,
  }),
  async created() {
    await Promise.all([
      this.setPerson(this.hasLastVisitedPerson ? this.getLastVisitedPerson : this.$route.params.id),
      this.loadTowns(),
      this.loadCountries(),
    ]);
  },
  methods: {
    ...mapActions(['loadPerson', 'loadCountries', 'loadTowns']),
    ...mapMutations(['setLastVisited', 'setPeopleFilter']),
    setCountry(country) {
      this.person.country = country;
    },
    setTown(town) {
      this.person.town = town;
    },
    checkoutNew() {
      this.next = undefined;
      this.previous = undefined;
      this.person = { country: {}, town: {} };
      this.$router.push({ path: '/people/' });
    },
    setSearch() {
      this.setLastVisited(undefined);
      this.setPeopleFilter(this.person);
      this.setPerson();
    },
    async setPerson(id = undefined) {
      const { next, previous, person } = await this.loadPerson({
        id,
        filter: this.getPeopleFilter,
      });

      this.next = next;
      this.previous = previous;
      this.person = person;

      if (this.person && this.person.id) {
        this.$router.push({ path: `/people/${person.id}` });
        this.setLastVisited(person.id);
      }
    },
    deletePerson() {
      PeopleService.deletePerson(this.person.id).then(() => this.setPerson());
    },
    async savePerson() {
      PeopleService.savePerson(this.person).then(data => this.setPerson(data.id));
    },
  },
  computed: {
    ...mapGetters(['hasLastVisitedPerson', 'getLastVisitedPerson', 'getPeopleFilter', 'getPerson']),
    ...mapState({
      towns: state => state.towns.data,
      countries: state => state.countries,
    }),
    userCountry() {
      return this.person.country;
    },
    userTown() {
      return this.person.town;
    },
  },
};
