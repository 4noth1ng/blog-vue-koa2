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
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('../pages/Home'),
            name: 'home'
        },
        {
            path: '/blogs',
            component: () => import('../pages/blogs'),
            name: 'blogs'
        }
    ]

})
export default router