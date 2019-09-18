import { Vuetable } from 'vuetable-2';

export default {
  name: '',
  components: {
    Vuetable,
  },
  data: () => ({
    hey: 'hey',
  }),
  methods: {
    // ...
    // when the pagination data is available, set it to pagination component
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    // when the user click something that causes the page to change,
    // call "changePage" method in Vuetable, so that that page will be
    // requested from the API endpoint.
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
  },
};
