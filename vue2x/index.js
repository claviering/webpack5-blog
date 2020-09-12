import Vue from 'vue';
import App from './App.vue';
import VueTouchEvents from './directive/touch'

Vue.use(VueTouchEvents)

new Vue({
  el: '#app',
  render: h => h(App)
})