/*
	配置编译环境和线上环境之间切换
	baseUrl:域名地址
	routerMode:路由模式
*/

let baseUrl = ''
let jsonUrl = ''
let routerMode = 'hash'

if(process.env.NODE_ENV == 'development'){
	baseUrl = '../'
	jsonUrl = '../'
}else if(process.env.NODE_ENV == 'production'){
	jsonUrl = 'http://sel.bless-info.com/front/dist/'
	baseUrl = 'http://sel.bless-info.com/'
}

export {
	baseUrl,
	jsonUrl,
	routerMode
}