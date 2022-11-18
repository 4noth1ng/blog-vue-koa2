import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex)

//导出store
export default new Vuex.Store({
    //将数据定义在state里面，state是一个对象
    state: {
        isCollapse: true,
        /*write data
         */
        title: '',
        content: '',
        createtime: 1,
        blogType: 1,
        value: '',


    },
    actions: {
        changeCollapse(context, data) {
            context.commit('changeCollapse', data)
        }
    },
    mutations: {
        changeCollapse(state, data) {
            state.isCollapse = data
        },
        editTitle(state, title) {
            state.title = title
        },
        editContent(state, content) {
            state.content = content
        },
        editCreatetime(state, createtime) {
            state.createtime = createtime
        },
        editBlogType(state, blogType) {
            state.blogType = blogType
        },
        editValue(state, value) {
            state.value = value
        },
    }
})