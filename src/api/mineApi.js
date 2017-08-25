//我的相关api
import { fetch,postData } from '../service/httpService'
import { baseUrl,jsonUrl } from '../config/env'

export function qrychild(body){
	return fetch(baseUrl+'qrychild',body)
}