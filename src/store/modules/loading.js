const state = {
	isLoading: false
}

const mutations = {
	updateLoadingStatus (state, payload) {
      	state.isLoading = payload.isLoading
    }
}

const getters = {
	activeIsLoading(state){
		return state.isLoading
	}
}


export default {
	state,
	mutations
}