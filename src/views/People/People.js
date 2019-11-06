import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'People',
  data: () => ({
    next: undefined,
    previous: undefined,
    person: undefined,
  }),
  async created() {
    const { next, previous, person } = await this.loadPerson({
      id: this.hasLastVisitedPerson ? this.getLastVisitedPerson : undefined,
      filter: this.hasLastVisitedPerson ? this.getPeopleFilter : undefined,
    });
    this.next = next;
    this.previous = previous;
    this.person = person;
  },
  methods: {
    ...mapActions(['loadPerson']),
  },
  watch: {

  },
  computed: {
    ...mapGetters(['hasLastVisitedPerson', 'getLastVisitedPerson', 'getPeopleFilter', 'getPerson']),
  },
};
