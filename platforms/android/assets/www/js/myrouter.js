//开始定义各个模块
const Setting = {template:'<div>设置模块</div>'}
const Friends = {template:'<div>朋友模块</div>'}
const Music = {template:'<div>音乐模块</div>'}
const Search = {template:'<div>搜索模块</div>'}

//定义各个路由
const routes = [
 { path: '/setting',component: Setting },
 { path: '/friends',component: Friends},
 { path: '/music' , component: Music},
 {path: '/search' , component: Search}
]


const router = new VueRouter({
	routes
})