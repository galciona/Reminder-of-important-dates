import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import ItemsComponent from './components/items.vue';

Vue.use(Vuetify)

Vue.component('items-component', ItemsComponent)
new Vue({
  el: '#app',
  render: h => h(App)
})
