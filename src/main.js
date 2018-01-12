// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueFire from 'vuefire';
import { store } from './store/store';


Vue.config.productionTip = true;

Vue.use(VueFire);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
