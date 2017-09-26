// 课程相关api
import { fetch,postData } from '../service/httpService'
import { baseUrl,jsonUrl } from '../config/env'

export function getCourseList(body){
	return fetch(baseUrl+'QryCourse',body)
}

export function getVideoPlayAuth(body){
	return fetch(baseUrl+'GetVideoPlayAuth',body)
}

export function videoPlaybackRecord(body){
	return fetch(baseUrl+'VideoPlaybackRecord',body)
}

// 课程支付下单
export function coursePay(body){
	return fetch(baseUrl+'wxPayOrder',body)
}