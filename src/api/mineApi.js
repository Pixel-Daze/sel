//我的相关api
import { fetch,postData } from '../service/httpService'
import { baseUrl,jsonUrl } from '../config/env'

export function qrychild(body){
	return fetch(baseUrl+'qrychild',body)
}

export function addchild(body){
	return fetch(baseUrl+'addchild',body)
}

export function UploadChildImg(body){
	return fetch(baseUrl+'UploadChildImg',body)
}

export function getMineAss(body){
	// return fetch(jsonUrl+'static/json/myAss.json')
	return fetch(baseUrl+'QryMyEvaluation',body)
}

export function getMineCourse(body){
	// return fetch(jsonUrl+'static/json/myCourse.json')
	return fetch(baseUrl+'QryMyCourse',body)
}

export function getProvinceList(body){
	return fetch(baseUrl+"GetProvinces",body)
}

export function getCityList(body){
	return fetch(baseUrl+'GetCities',body)
}

/* @desc:获取儿童与家长关系 */
export function getRelation(body){
	return fetch(baseUrl+'GetRelation',body)
}

/* @desc:获取单个儿童信息 */
export function getChildById(body){
	return fetch(baseUrl+'qrysinglechild',body)
}

/* @desc:获取个人中心信息 */
export function qryUser(body){
	return fetch(baseUrl + 'QryUser', body)
}

/* @desc:更新个人中心信息 */
export function updateUser(body){
	return fetch(baseUrl + 'UpdateUser', body)
}