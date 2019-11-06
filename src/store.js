/* eslint-disable no-void */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import Vue from 'vue';
import Vuex from 'vuex';
import CountryService from './services/CountryService';
import TownService from './services/TownService';
import PeopleService from './services/PeopleService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [],
    people: {
      data: [],
      filter: {},
      lastVisited: 'e60cd79a-f3ee-415a-a894-d4f918dd6801',
    },
    towns: {
      size: 25,
      page: 1,
      total: 100,
      data: [],
      search: '',
    },
  },
  mutations: {
    setCountries: (state, countries) => state.countries = countries,
    setPage: (state, page) => state.towns.page = page,
    setTotalTowns: (state, total) => state.towns.total = total,
    setPageSize: (state, size) => state.towns.size = size,
    setTownSearch: (state, search) => state.towns.search = search,
    resetSavedTowns: (state) => { if (state.towns.data.length > 0) { state.towns.data = []; state.towns.page = 1; } },
    addTowns: (state, towns) => {
      state.towns.total += towns.filter(el => state.towns.data.filter(town => town.id === el.id).length === 0).length;
      state.towns.data.push(...towns.filter(el => state.towns.data.filter(town => town.id === el.id).length === 0));
    },
    replaceTown: (state, town) => state.towns.data = state.towns.data.map(el => (el.id === town.id ? town : el)),
    removeTown: (state, id) => state.towns.data = state.towns.data.filter(el => el.id !== id),
  },
  actions: {
    deleteTown({ commit }, id) {
      TownService.deleteTown(id).then(() => {
        commit('removeTown', id);
      });
    },
    async loadCountries({ commit }) {
      const countries = CountryService.getCountries();
      commit('setCountries', countries);
      commit('setCountries', await countries);
    },
    async loadPerson(store, { id, filter }) {
      return PeopleService.loadPerson(id, filter);
    },
    async getTowns({ state, commit }) {
      const offset = state.towns.data.length;
      const size = state.towns.size === 0 ? 25 : state.towns.size;
      if (state.towns.total === offset && ((state.towns.page - 1) * size) > state.towns.total) {
        return [];
      }
      if ((state.towns.page - 1) * size < state.towns.data.length) {
        return state.towns.data.slice(size * (state.towns.page - 1), size * state.towns.page);
      }
      const response = await TownService.getTowns(offset, size < 10 ? 10 : size, state.towns.search);
      (response.total > 0) ? commit('addTowns', response.results) : commit('resetSavedTowns');
      commit('setTotalTowns', response.total);
      return response.results;
    },
    async loadTown({ state, commit }, id) {
      if (state.towns.data.filter(el => el.id === id) === 1) {
        return state.towns.data.find(el => el.id === id);
      }
      const town = await TownService.getTown(id);
      commit('addTowns', [town]);
      return town;
    },
  },
  getters: {
    getPage: $state => $state.towns.page,
    getPageSize: $state => $state.towns.size,
    getTotalTowns: $state => $state.towns.total,
    getTownSearch: $state => $state.towns.search,
    getTown: $state => id => $state.towns.data.find(el => el.id === id),
    getPerson: $state => id => $state.people.data.find(el => el.id === id),
    getPeopleFilter: $state => $state.people.filter,
    hasLastVisitedPerson: $state => !!$state.people.lastVisited,
    getLastVisitedPerson: $state => $state.people.lastVisited,
  },
});
