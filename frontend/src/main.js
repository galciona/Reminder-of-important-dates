import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import ItemsComponent from './components/Items.vue';
import DialogItemComponent from './components/dialog_item.vue';

Vue.use(Vuetify)

Vue.component('items-component', ItemsComponent);
Vue.component('dialog_item-component', DialogItemComponent);

new Vue({
  el: '#app',
  render: h => h(App)
})
