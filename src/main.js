import Vue from 'vue';
import Vuetable from 'vuetable-2';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Argon from './assets/js/argon-kit';

Vue.use(Argon);
Vue.use(Vuetable);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
