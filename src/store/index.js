export default {

	state: {
           code: "",
           blockly: "",
           linenumber: 0,
           execution: "stopped", //TODO: enum?
           user: "none" // TODO: at the moment it can not be empty on start
	},

	getters: {
        getCode(state){ 
            return state.code
        },

        getBlockly(state){ 
            return state.blockly
        },

        getLinenumber(state){ 
            return state.linenumber
        },

        getExecution(state){
            return state.execution
        },

        getUser(state){
            return state.user
        },

    },

	actions: {
        setCode({commit, getters}, code){
            commit('code', code)
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

    },

	mutations: {
        code(state, code) {
            return state.code = code
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

	}
}
