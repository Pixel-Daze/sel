/* store */
import store from '../store'

export const request = function(config){
	store.commit('updateLoadingStatus', {isLoading: true})
    return config
}

export const response = function(response){
    store.commit('updateLoadingStatus', {isLoading: false})
    return response
    
}