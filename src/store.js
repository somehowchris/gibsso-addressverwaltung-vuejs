import Vue from 'vue';
import Vuex from 'vuex';
import CountryService from './services/CountryService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [],
    people: [],
    towns: [],
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },
  },
  actions: {
    async loadCountries({ commit }) {
      const countries = CountryService.getCountries();
      commit('setCountries', countries);

      commit('setCountries', await countries);
    },
  },
});
