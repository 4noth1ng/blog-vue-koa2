<template>
    <div class="list-container" @scroll.passive="throttleScroll()" ref="container">
        <div class="list-phantom" :style="{ height: listHeight + 'px' }"></div>
        <div class="father" :key="reload"  :style="{ transform: getTransform }">
            <ul v-if="render" ref="bloglist">
                <li v-for="(item, index) in visibleData" :key="index">
                    <a @mouseenter="nowIndex = index" @mouseleave="nowIndex = -1" @click="goBlogDetail(item.id)">
                        <div class="article">
                            <h2 :class="{ active: nowIndex === index }">{{ item.title }}</h2>
                            <div class="content">{{ item.content }}</div>
                            <div class="type">{{ item.blogType }}</div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="moreResponse" @click="moreBlogs" v-if="isShowMore">
                <div class="moretext">点击加载更多</div>
                <i class="el-icon-more" style="display:block"></i>
            </div>
        </div>
    </div>
</template>

<script>
import requests from '@/api/request';
import { mapState } from 'vuex';
import _ from 'lodash'
export default {
    data() {
        return {
            isHover: false,
            page: 1,
            limit: 9,
            nowIndex: -1,
            isShowMore: true,
            blogTotalLength: 0,
            render: true,
            type: 0,
            reload: 1,
            keyword: '',
            //可视区域高度
            screenHeight: 0,
            //偏移量
            startOffset: 0,
            //起始索引
            start: 0,
            //结束索引
            end: null,
            //每个项目height
            itemSize: 217
        }
    },
    methods: {
        testScroll() {
            console.log(123);
        },
        enter(item) {
            Object.defineProperty(item, "isHover", {
                value: true
            })
            console.log(item);
        },
        leave(item) {
            Object.defineProperty(item, "isHover", {
                value: false
            })
            console.log(item);

        },
        moreBlogs() {
            let top =0
            requests.get('http://localhost:3000/api/blogs/getBlogs', {
                params: {
                    page: this.page,
                    limit: this.limit,
                    blogType: this.type,
                }
            }).then((res) => {
                top = this.$refs.bloglist.scrollTop
                this.$store.commit('getMoreBlogs', res)
                // res.data.forEach(item => {
                //     this.blogs.push(item)
                //     switch (item.blogType) {
                //         case 1: { item.blogType = 'CSS'; break; }
                //         case 2: { item.blogType = 'JavaScript'; break; }
                //         case 3: { item.blogType = 'Vue'; break; }
                //         case 4: { item.blogType = 'Node.js'; break; }
                //         case 5: { item.blogType = '算法'; break; }
                //         default: break;
                //     }
                // })
            }).then(() => {
                this.$refs.bloglist.scrolltop = top
                this.page++
                console.log(this.listHeight);
            })

        },
        goBlogDetail(id) {
            this.$router.push({
                name: 'blogs',
                query: {
                    id
                }
            })
        },
        scrollEvent() {
            //被滚动条卷去的高度
            let scrollTop = this.$refs.container.scrollTop
            //此时的开始索引
            this.start = Math.floor(scrollTop / this.itemSize)
            //end
            this.end = this.start + this.visibleCount
            //偏移量 就是 被卷去的高度 - 没被完全卷完的那个项目的高度
            this.startOffset = scrollTop - (scrollTop % this.itemSize)
            console.log(1);
        },
        throttleScroll: _.throttle(function () {
                //被滚动条卷去的高度
                let scrollTop = this.$refs.container.scrollTop
                //此时的开始索引
                this.start = Math.floor(scrollTop / this.itemSize)
                //end
                this.end = this.start + this.visibleCount
                //偏移量 就是 被卷去的高度 - 没被完全卷完的那个项目的高度
                this.startOffset = scrollTop - (scrollTop % this.itemSize)
                console.log(1);
            }, 50)
        
    },
    async created() {
        const res2 = await requests.get('http://localhost:3000/api/blogs/getBlogs', {
            params: {
                page: this.page,
                limit: this.limit,
                blogType: this.type
            }
        })
        //this.blogs = res2.data
        this.$store.commit('setBlogs', res2.data)
        this.page++
        // this.blogs.forEach(item => {
        //     switch (item.blogType) {
        //         case 1: { item.blogType = 'CSS'; break; }
        //         case 2: { item.blogType = 'JavaScript'; break; }
        //         case 3: { item.blogType = 'Vue'; break; }
        //         case 4: { item.blogType = 'Node.js'; break; }
        //         case 5: { item.blogType = '算法'; break; }
        //         default: break;
        //     }
        // })
    },
    async mounted() {
        this.screenHeight = this.$refs.container.clientHeight
        this.start = 0
        this.end = this.start + this.visibleCount
    },
    watch: {
        blogs: {
            async handler(newval, oldval) {
                if (!this.$route.query.keyword) {
                    this.isShowMore = true
                    if (this.$route.query.keyword) this.keyword = this.$route.query.keyword
                    requests.get('http://localhost:3000/api/blogs/getBlogsLength', {
                        params: {
                            blogType: this.type,
                            keyword: this.keyword
                        }
                    })
                        .then(res => {
                            console.log(this.blogs.length)
                            console.log(res.data[0]["COUNT(*)"]);
                            if (this.blogs.length === res.data[0]["COUNT(*)"]) this.isShowMore = false
                        }).then(() => {

                            this.render = false
                            // 建议加上 nextTick 微任务 
                            // 否则在同一事件内同时将tableShow设置false和true有可能导致组件渲染失败
                            this.$nextTick(function () {
                                // 加载
                                this.render = true
                            })
                        })
                } else {
                    this.isShowMore = false
                    this.render = false
                    // 建议加上 nextTick 微任务 
                    // 否则在同一事件内同时将tableShow设置false和true有可能导致组件渲染失败
                    this.$nextTick(function () {
                        // 加载
                        this.render = true
                    })
                }
            }
        },
        $route: {
            handler() {
                this.page = 1
                let res2
                if (!this.$route.query.keyword) {
                    requests.get('http://localhost:3000/api/blogs/getBlogs', {
                        params: {
                            page: this.page,
                            limit: this.limit,
                            blogType: this.$route.query.blogType || 0
                        }
                    }).then(res => {
                        res2 = res

                    }).then(() => {
                        this.$store.commit('setBlogs', res2.data)
                        this.page++
                        this.type = this.$route.query.blogType || 0
                    })
                }
                //this.blogs = res2.data

            }
        }
    },
    computed: {
        ...mapState(['blogs']),
        //可视区域的项目数
        //其实理解为Math.floor(this.screenHeight / this.itemSize) + 2 比较好理解 就是可能上下的项目没显示完整
        visibleCount() {
            return Math.ceil(this.screenHeight / this.itemSize) + 1
        },
        //偏移量
        //渲染后将可视区域移到渲染区域
        getTransform() {
            return `translateY(${this.startOffset}px)`
        },
        //截取数据
        visibleData() {
            return this.blogs.slice(this.start, Math.min(this.end, this.blogs.length))
        },
        //整个数据容器的高度 用于给容器占高度
        listHeight() {
            return this.blogs.length * this.itemSize
        }
    }
}
</script>

<style lang="scss" scoped>
.active {
    text-decoration: underline;
    color: #0164da
}

.list-container {
    position: relative;
    width: 100%;
    height: 100vh;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    .list-phantom {
        position: absolute;
            left: 0;
            top: 0;
            right: 0;
            z-index: -1;
    }
    .father {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
            ul {
                padding: 0;
                border: 0;
                margin: 0;
    
                li {
                    list-style: none;
                    padding: 32px 0;
    
                    a {
                        cursor: pointer;
    
                        .article {
                            border-bottom: 1px solid #eaeaea;
                            min-height: 150px;
    
                            h2 {
                                margin: 2px 0 15px 0;
                            }
    
                            .content {
                                font-weight: 400;
                            }
    
                            .type {
                                margin-top: 30px;
                                color: #808080
                            }
                        }
                    }
                }
            }
    
            .moreResponse {
                text-align: center;
    
                &:hover {
                    cursor: pointer;
                }
    
                .moretext {
                    color: #222;
                    font-size: 17px;
                    margin-bottom: 15px;
                }
            }
        }
}
</style>
