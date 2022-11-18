import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        blogs: []
    },
    mutations: {
        setBlogs(state, data) {
            state.blogs = data
            state.blogs.forEach(item => {
                switch (item.blogType) {
                    case 1: {
                        item.blogType = 'CSS';
                        break;
                    }
                    case 2: {
                        item.blogType = 'JavaScript';
                        break;
                    }
                    case 3: {
                        item.blogType = 'Vue';
                        break;
                    }
                    case 4: {
                        item.blogType = 'Node.js';
                        break;
                    }
                    case 5: {
                        item.blogType = '算法';
                        break;
                    }
                    default:
                        break;
                }
            })
        },
        getMoreBlogs(state, res) {
            res.data.forEach(item => {
                state.blogs.push(item)
                switch (item.blogType) {
                    case 1: {
                        item.blogType = 'CSS';
                        break;
                    }
                    case 2: {
                        item.blogType = 'JavaScript';
                        break;
                    }
                    case 3: {
                        item.blogType = 'Vue';
                        break;
                    }
                    case 4: {
                        item.blogType = 'Node.js';
                        break;
                    }
                    case 5: {
                        item.blogType = '算法';
                        break;
                    }
                    default:
                        break;
                }
            })
        },
        getBlogByType(state, data) {
            state.blogs = data
            state.blogs.forEach(item => {
                switch (item.blogType) {
                    case 1: {
                        item.blogType = 'CSS';
                        break;
                    }
                    case 2: {
                        item.blogType = 'JavaScript';
                        break;
                    }
                    case 3: {
                        item.blogType = 'Vue';
                        break;
                    }
                    case 4: {
                        item.blogType = 'Node.js';
                        break;
                    }
                    case 5: {
                        item.blogType = '算法';
                        break;
                    }
                    default:
                        break;
                }
            })
        },
        getBlogsByTitle(state,data) {
            state.blogs = data
            state.blogs.forEach(item => {
                switch (item.blogType) {
                    case 1: {
                        item.blogType = 'CSS';
                        break;
                    }
                    case 2: {
                        item.blogType = 'JavaScript';
                        break;
                    }
                    case 3: {
                        item.blogType = 'Vue';
                        break;
                    }
                    case 4: {
                        item.blogType = 'Node.js';
                        break;
                    }
                    case 5: {
                        item.blogType = '算法';
                        break;
                    }
                    default:
                        break;
                }
            })
            console.log(state.blogs);
        }
    }
});

export default store;