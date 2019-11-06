import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/countries',
    },
    {
      path: '/countries',
      name: 'Countries',
      component: () => import('./views/Countries/Countries.vue'),
      children: [
        {
          path: ':id',
          component: () => import('./views/Countries/Countries.vue'),
        },
      ],
    },
    {
      path: '/towns',
      name: 'Towns',
      component: () => import('./views/Towns/Towns.vue'),
      children: [
        {
          path: ':id',
          component: () => import('./views/Towns/Towns.vue'),
        },
      ],
    },
    {
      path: '/people',
      name: 'People',
      component: () => import('./views/People/People.vue'),
    },
  ],
});
