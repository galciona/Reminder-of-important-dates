import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import ItemsComponent from './components/Items.vue';
import DialogItemComponent from './components/Dialog_item.vue';
import BtnDeleteComponent from './components/Btn_delete.vue';
import SettingsComponent from './components/Settings.vue';
import store from './store.js';

Vue.use(Vuetify);
Vue.component('items-component', ItemsComponent);
Vue.component('dialog_item-component', DialogItemComponent);
Vue.component('btn_delete-component', BtnDeleteComponent);
Vue.component('settings-component', SettingsComponent);

store.dispatch('loadEmployees');
store.dispatch('loadSettings');

if (window.DEBAG) console.info(store);
new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
