import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

import VueSweetalert2 from 'vue-sweetalert2';
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
Vue.use(VueSweetalert2, options);

new Vue({
  render: h => h(App),
}).$mount('#app')

// var app = new Vue({
//   el: "#app",
//   data: {
//     login: "LOGIN",
//     email: "email",
//     password: "password"
//   }
// })