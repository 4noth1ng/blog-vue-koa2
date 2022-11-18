import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

const router = new VueRouter({
    routes: [{
            path: '*',
            redirect: '/home/blog'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import("../pages/Home"),
            children: [{
                path: 'blog',
                name: 'blog',
                component: () => import('@/pages/Home/Blog')
            }, {
                path: 'user',
                name: 'user',
                component: () => import('@/pages/Home/Users')
            }, {
                path: 'write',
                name: 'write',
                component: () => import('@/pages/Home/Write')
            }]
        },
        {
            path: '/login',
            name: 'login',
            component:()=>import('@/pages/Login')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (!token&&to.name!=='login') {
        next({name:'login'})
    } else {
        next()
    }
})

export default router