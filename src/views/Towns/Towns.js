import { Vuetable } from 'vuetable-2';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import TownService from '../../services/TownService';

export default {
  name: '',
  components: {
    Vuetable,
  },
  data: () => ({
    form: {
      postalCode: undefined,
      name: undefined,
    },
    edit: false,
    townData: [],
    titles: [],
    pageSizes: [10, 25, 50, 100],
    headers: [{
      name: 'Plz',
      prop: 'postalCode',
      key: 'postalCode',
    }, {
      name: 'Ort',
      prop: 'name',
      key: 'name',
    }],
  }),
  async created() {
    if (this.$route.params.id) {
      this.edit = true;
      await this.loadTown(this.$route.params.id);
      this.loadTownIntoForm(this.$route.params.id);
    }
    await this.updateData();
  },
  methods: {
    ...mapMutations(['setPageSize', 'setPage', 'setTotalTowns', 'setTownSearch', 'resetSavedTowns', 'addTowns', 'replaceTown']),
    ...mapActions(['getTowns', 'loadTown', 'deleteTown']),
    handleRowClick(town) {
      if (town instanceof Object) {
        this.$router.push({ path: town.id ? `/towns/${town.id}` : '/towns' }).catch(() => { });
        this.edit = true;
        this.loadTownIntoForm(town.id);
        return;
      }
      console.log(3);
      this.updateData();
    },
    async updateData() {
      console.log(0);
      this.townData = await this.getTowns();
    },
    loadTownIntoForm(id) {
      this.form = { ...this.getTown(id) };
    },
    editNewTown() {
      this.edit = true;
      this.form = {
        postalCode: '',
        name: '',
      };
    },
    async saveTown() {
      if (!this.form.id) {
        await TownService.createTown(this.form).then((data) => { console.log(data); this.addTowns([data]); });
        this.$router.push({ path: '/towns' });
        this.edit = false;
        return;
      }
      await TownService.updateTown(this.form, this.form.id).then(el => this.replaceTown(el));
      this.$router.push({ path: '/towns' });
      this.edit = false;
    },
    deleteById(id) {
      this.deleteTown(id);
      this.edit = false;
    },
    updateDueToChange() {
      console.log(4);
      this.updateData().then(() => {
        this.pageSizes = [10, 25, 50, 100].filter(el => el < this.getTotalTowns);
        this.pageSizes.push(this.getTotalTowns);
      });
    },
  },
  computed: {
    ...mapState(['countries']),
    ...mapState({
      towns: state => state.towns,
      townArray: state => state.towns.data,
    }),
    ...mapGetters(['getPageSize', 'getPage', 'getTotalTowns', 'getTownSearch', 'getTown']),
    size: {
      get() {
        return this.getPageSize;
      },
      set(value) {
        this.setPageSize(value);
      },
    },
    total: {
      get() {
        return this.getTotalTowns;
      },
      set(value) {
        this.setTotalTowns(value);
      },
    },
    page: {
      get() {
        return this.getPage;
      },
      set(value) {
        this.setPage(value);
      },
    },
    search: {
      get() {
        return this.getTownSearch;
      },
      set(value) {
        this.setTownSearch(value);
      },
    },
  },
  watch: {
    edit() {
      if (this.edit === false) this.$router.push({ path: '/towns' });
    },
    search() {
      this.resetSavedTowns();
    },
    townArray() {
      console.log(1);
      this.updateDueToChange();
    },
    towns: {
      handler() {
        console.log(2);
        this.updateDueToChange();
      },
      deep: true,
    },
  },
};
