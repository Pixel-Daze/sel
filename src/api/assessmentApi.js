// 测评相关api
import { fetch,postData } from '../service/httpService'
import { baseUrl } from '../config/env'

export function getAssessmentList(body){
	return fetch('./static/json/AssessmentList.json')
}