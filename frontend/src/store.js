import Vue from 'vue';
import Vuex from 'vuex';
import API from './api';
import $ from 'jquery';

Vue.use(Vuex)

const state = {
    employees: [],
    settings: []
}
const mutations = {
    SET_SETTINGS(state, data) {
        state.settings = data
        console.info("SET_SETTINGS");
        console.info(state.settings.data);
    },
    SET_EMPLOYEES(state, data) {
        state.employees = data;
        console.info("SET_EMPLOYEES");
        console.info(state.employees.data);
    },
    SET_EMPLOYEE(state, emploee) {
        state.employees.data.forEach((item, i, arr) => {
            if (item._id === emploee.data._id) {
                item.surname = emploee.data.surname;
                item.name = emploee.data.name;
                item.position = emploee.data.position;
                item.email = emploee.data.email;
                item.phone = emploee.data.phone;
                item.birthday = emploee.data.birthday;
                console.info("SET_EMPLOYEE");
                console.info(item);
            }
        });
    },
    ADD_EMPLOYEE(state, emploee) {
        if (state.employees.data) {
            state.employees.data.push(emploee.data)
            console.info("ADD_EMPLOYEE");
            console.info(emploee);
        }
    },
    DELETE_EMPLOYEE(state, id) {
        let data = [];
        state.employees.data.forEach((item, i, arr) => {
            if (item._id === id.id) {
                delete state.employees.data[i];
                console.info("DELETE_EMPLOYEE");
                console.info(item);
            } else {
                data.push(item)
            }
        });
        state.employees.data = data;
    }
}

const actions = {
    loadEmployees: ({commit}) => {
        fetch(API.GET_EMPLOYEES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                commit('SET_EMPLOYEES', {data})
            })
            .catch(error => {
                if (window.DEBAG) console.error("ERR => GET_EMPLOYEES " + error)
            });
    },

    loadEmployee: ({commit}, id) => {
        fetch(API.GET_EMPLOYEE + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                commit('SET_EMPLOYEE', {data})
            })
            .catch(error => {
                if (window.DEBAG) console.error("ERR => GET_EMPLOYEE " + error)
            });
    },

    loadSettings: ({commit}) => {
        fetch(API.GET_SETTINGS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                commit('SET_SETTINGS', {data})
            })
            .catch(error => {
                if (window.DEBAG) console.error("ERR => GET_SETTINGS " + error)
            });
    },

    postEmployee: ({commit}, item) => {
        $.ajax({
            type: "POST",
            url: API.POST_EMPLOYEE,
            data: item[0],
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: (data) => {
                item[0].created = data.created;
                item[0]._id = data._id;
                data = item[0];
                commit('ADD_EMPLOYEE', {data})
            },
            failure: (error) => {
                if (window.DEBAG) console.error("ERR => POST_EMPLOYEE " + error)
            },
        });
    },

    putEmployee: ({commit}, item) => {
        $.ajax({
            type: "PUT",
            url: API.PUT_EMPLOYEE + item[0]._id,
            data: item[0],
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: (data) => {
                data = item[0];
                commit('SET_EMPLOYEE', {data})
            },
            failure: (error) => {
                if (window.DEBAG) console.error("ERR => PUT_EMPLOYEE " + error)
            },
        });
    },

    deleteEmployee: ({commit}, id) => {
        fetch(API.DELETE_EMPLOYEE + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    commit('DELETE_EMPLOYEE', {id})
                }
            })
            .catch(error => {
                if (window.DEBAG) console.error("ERR => DELETE_EMPLOYEE " + error)
            });
    },

    putSettings: ({commit}, item) => {
        $.ajax({
            type: "PUT",
            url: API.PUT_SETTINGS + item[0]._id,
            data: item[0],
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: (data) => {
                data = item[0];
                commit('SET_SETTINGS', {data})
            },
            failure: (error) => {
                if (window.DEBAG) console.error("ERR => SET_SETTINGS " + error)
            },
        });
    }
}

const getters = {}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})