export default {

	state: {
        code: "",
        blockly: "",
        linenumber: 0,
        execution: "stopped" //TODO: enum?
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
	}
}
