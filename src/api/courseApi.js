// 课程相关api
import { fetch,postData } from '../service/httpService'
import { baseUrl } from '../config/env'

export function getCourseList(body){
	return fetch('../static/json/CourseList.json')
}