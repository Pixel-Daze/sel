import * as api from '../../api/mineApi'

const state = {
	areaList: []
}

const actions = {
	FETCH_PROVINCE_LIST: ({ commit, state }, body) => {
		return api.getProvinceList(body)
			.then(resp => {
				let Data = resp.data.data
				commit('SET_PROVINCE_LIST', { Data })
			})
	},

	FETCH_CITY_LIST: ({ commit, state }, body) => {
		return api.getCityList(body)
			.then(resp => {
				let Data = resp.data.data
				commit('SET_CITY_LIST', { Data })
			})
	}
}

const mutations = {
	SET_PROVINCE_LIST: (state, { Data }) => {
		state.areaList = Data
	},
	SET_CITY_LIST: (state, { Data }) => {
		state.areaList.push(...Data)
	}
}

const getters = {
	areaList(state) {
		return state.areaList
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}