import Vue from 'vue';
import Vuetable from 'vuetable-2';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/de';
import locale from 'element-ui/lib/locale';
import VueDataTables from 'vue-data-tables';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Argon from './assets/js/argon-kit';

Vue.use(VueDataTables);
Vue.use(Argon);
Vue.use(Vuetable);
Vue.use(ElementUI);

Vue.config.productionTip = false;

locale.use(lang);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
