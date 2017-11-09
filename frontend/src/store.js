import Vue from 'vue';
import Vuex from 'vuex';
import API from './api';
import $ from 'jquery';

Vue.use(Vuex)

const state = {
    employees: [],
    settings: {},
    progress: false
}
const mutations = {
    TURN_ON_PROGRESS(state) {
        state.progress=true;
        console.info("TURN_ON_PROGRESS");
        console.info(state.progress);
    },
    TURN_OFF_PROGRESS(state) {
       state.progress=false;
        console.info("TURN_OFF_PROGRESS");
        console.info(state.progress);
    },
    SET_SETTINGS(state, data) {
        state.settings = data;
        commit('TURN_OFF_PROGRESS');
        console.info("SET_SETTINGS");
        console.info(state.settings.data);
    },
    SET_EMPLOYEES(state, data) {
        state.employees = data;
        commit('TURN_ON_PROGRESS');
        console.info("SET_EMPLOYEES");
        console.info(state.employees.data);
    },
    SET_EMPLOYEE(state, emploee) {
        state.employees.data.forEach((item, i, arr) => {
            if (item._id === emploee.data._id) {
                item.surname = emploee.data.surname;
                item.name = emploee.data.name;
                item.position = emploee.data.position;
                item.email = emploee.data.mail;
                item.phone = emploee.data.phone;
                item.birthday = emploee.data.birthday;
                console.info("SET_EMPLOYEE");
                console.info(item);
            }
        });
        commit('TURN_OFF_PROGRESS');
    },
    ADD_EMPLOYEE(state, emploee) {
        if (state.employees.data) {
            state.employees.data.push(emploee.data)
            console.info("ADD_EMPLOYEE");
            console.info(emploee);
        }
        commit('TURN_OFF_PROGRESS');
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
        commit('TURN_OFF_PROGRESS');
    }
}

const actions = {
    loadEmployees: ({commit}) => {
        commit('TURN_ON_PROGRESS');
        fetch(API.GET_EMPLOYEES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                commit('SET_EMPLOYEES', {data})
                commit('TURN_OFF_PROGRESS');
            })
            .catch(error => {
                if (window.DEBAG) console.error("ERR => GET_EMPLOYEES " + error)
                commit('TURN_OFF_PROGRESS');
            });
    },

    loadEmployee: ({commit}, id) => {
        commit('TURN_ON_PROGRESS');
        fetch(API.GET_EMPLOYEE + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                commit('SET_EMPLOYEE', {data})
                commit('TURN_OFF_PROGRESS');
            })
            .catch(error => {
                if (window.DEBAG) console.error("ERR => GET_EMPLOYEE " + error)
                commit('TURN_OFF_PROGRESS');
            });
    },

    loadSettings: ({commit}) => {
        commit('TURN_ON_PROGRESS');
        fetch(API.GET_SETTINGS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                commit('SET_SETTINGS', {data})
                commit('TURN_OFF_PROGRESS');
            })
            .catch(error => {
                if (window.DEBAG) console.error("ERR => GET_SETTINGS " + error)
                commit('TURN_OFF_PROGRESS');
            });
    },

    postEmployee: ({commit}, item) => {
        commit('TURN_ON_PROGRESS');
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
                commit('TURN_OFF_PROGRESS');
            },
            failure: (error) => {
                if (window.DEBAG) console.error("ERR => POST_EMPLOYEE " + error)
                commit('TURN_OFF_PROGRESS');
            },
        });
    },

    putEmployee: ({commit}, item) => {
        commit('TURN_ON_PROGRESS');
        $.ajax({
            type: "PUT",
            url: API.PUT_EMPLOYEE + item[0]._id,
            data: item[0],
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: (data) => {
                data = item[0];
                commit('SET_EMPLOYEE', {data});
                commit('TURN_OFF_PROGRESS');
            },
            failure: (error) => {
                if (window.DEBAG) console.error("ERR => PUT_EMPLOYEE " + error)
                commit('TURN_OFF_PROGRESS');
            },
        });
    },

    deleteEmployee: ({commit}, id) => {
        commit('TURN_ON_PROGRESS');
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
                    commit('TURN_OFF_PROGRESS');
                }
            })
            .catch(error => {
                if (window.DEBAG) console.error("ERR => DELETE_EMPLOYEE " + error)
                commit('TURN_OFF_PROGRESS');
            });
    },

    putSettings: ({commit}, item) => {
        commit('TURN_ON_PROGRESS');
        $.ajax({
            type: "PUT",
            url: API.PUT_SETTINGS + item[0]._id,
            data: item[0],
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: (data) => {
                data = item[0];
                commit('SET_SETTINGS', {data})

                commit('TURN_OFF_PROGRESS');
            },
            failure: (error) => {
                if (window.DEBAG) console.error("ERR => SET_SETTINGS " + error)
                commit('TURN_OFF_PROGRESS');
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