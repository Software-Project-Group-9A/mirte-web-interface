
import createPersistedState from 'vuex-persistedstate'
import i18n, { selectedLocale } from '../i18n'

export default {

    state: {
        code: "",
        tutorial: null,
        blockly: "",
        linenumber: 0,
        execution: "stopped",   // TODO: enum?
        user: "none",           // TODO: at the moment it can not be empty on start
        PConfig: "[]",          // For some reason this needs to be a string (persistent?)
        locale: selectedLocale
    },

    getters: {
        getCode(state) {
            return state.code
        },
        getTutorial(state) {
            return state.tutorial
        },
        getBlockly(state) {
            return state.blockly
        },
        getLinenumber(state) {
            return state.linenumber
        },
        getExecution(state) {
            return state.execution
        },
        getUser(state) {
            return state.user
        },
        getPConfig(state) {
            return JSON.parse(state.PConfig)
        },
        getLocal(state){
            return state.locale;
        }
    },
    actions: {
        setCode({commit, getters}, code){
            commit('code', code)
        },
        setTutorial({commit, getters}, tutorial){
            commit('tutorial', tutorial)
        },
        setBlockly({commit, getters}, blockly){
            commit('blockly', blockly)
        },
        setLinenumber({commit, getters}, linenumber){
            commit('linenumber', linenumber)
        },
        setExecution({commit, getters}, execution){
            commit('execution', execution)
        },
        setUser({commit, getters}, user){
            commit('user', user)
        },
        setPConfig({commit, getters}, PConfig) {
            commit('PConfig', PConfig)
        },
        setLocale({commit, getters}, locale){
            i18n.locale = locale;
            commit('locale', locale);
        }
    },
    mutations: {
        code(state, code) {
            return state.code = code
        },
        tutorial(state, tutorial) {
            return state.tutorial = tutorial
        },
        blockly(state, blockly) {
            return state.blockly = blockly
        },
        linenumber(state, linenumber) {
            return state.linenumber = linenumber
        },
        execution(state, execution) {
            return state.execution = execution
        },
        user(state, user) {
            return state.user = user
        },
        PConfig(state, PConfig) {
            return state.PConfig = JSON.stringify(PConfig)
        },
        locale(state, locale){
            return state.locale = locale;
        }
    },
    plugins: [createPersistedState()]
}
