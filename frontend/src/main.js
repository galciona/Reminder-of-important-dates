import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import ItemsComponent from './components/Items.vue';
import DialogItemComponent from './components/dialog_item.vue';
import BtnDeleteComponent from './components/btn_delete.vue';

import store from './store.js';

Vue.use(Vuetify);
Vue.component('items-component', ItemsComponent);
Vue.component('dialog_item-component', DialogItemComponent);
Vue.component('btn_delete-component', BtnDeleteComponent);

store.dispatch('loadEmployees');
store.dispatch('loadSettings');
let item = {
    name: "TTTTaaanya",
    surname: "VV",
    position: "",
    phone: "499999999",
    mail: "olga@gmail.com",
    birthday: "1993-10-3",
    photo: ""
};
//store.dispatch('postEmployee', [item]);
let item2 = {
    _id: "5a04181d22b5460a4431282b",
    name: "TTTTaaanya2",
    surname: "22222",
    position: "33333",
    phone: "444444",
    mail: "555555",
    birthday: 2000-12-12,
    photo: ""
}
//store.dispatch('putEmployee',[item2]);
//store.dispatch('deleteEmployee',"5a02971b4c43931ea04e6197");
if (window.DEBAG) console.info(store);
new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
