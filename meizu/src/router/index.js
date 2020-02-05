import Vue from 'vue';
import Router from 'vue-router';
import Index from '../view/index';
import Category from '../view/category';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/category/:id?',
      name: 'Category',
      component: Category
    }
  ]
});
