// 测评相关api
import { fetch,postData } from '../service/httpService'
import { baseUrl,jsonUrl } from '../config/env'

export function getAssessmentList(body){
	return fetch(baseUrl+'getevalutionlist',body)
	// return fetch(jsonUrl+'static/json/AssessmentList.json')
}

export function getAssDetail(body) {
	return fetch(jsonUrl+'static/json/AssessmentDetail.json')
}

export function sendCode(body) {
	return fetch(baseUrl+'sendcode',body)
}

export function login(body){
	return postData(baseUrl+'login',body)
}