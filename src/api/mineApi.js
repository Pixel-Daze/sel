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