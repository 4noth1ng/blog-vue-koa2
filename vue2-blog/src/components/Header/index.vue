<template>
    <el-header>
        <el-row type="flex">
            <el-col :xl="4"></el-col>
            <el-col :xl="2">
                <div class="headerIcon" @click="goHome">
                </div>
            </el-col>
            <el-col :xl="5">
                <div class="headerFlex">
                    <div class="flex" @click="goHome">首页</div>
                    <div class="flex">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                博客分类
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,index) in dropdownItem" :key="index" @click.native="getBlogsByType(index)">
                                    {{item}}</el-dropdown-item>

                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="flex">Github</div>
                </div>
            </el-col>
            <el-col :xl="5">
            </el-col>
            <el-col :xl="4">
                <div class="search" @keyup.enter="goSearch">
                    <el-input v-model="input" placeholder="请输入内容" class="headerBtn" prefix-icon="el-icon-search">
                    </el-input>
                </div>
            </el-col>
            <el-col :xl="4"></el-col>
        </el-row>
    </el-header>
</template>

<script>
import requests from '@/api/request'
import { mapMutations, mapState } from 'vuex'
import _ from 'lodash'
export default {
    data() {
        return {
            input: '',
            dropdownItem: ['CSS', 'JavaScript', 'Vue', 'Node.js', '算法'],
            blogType: 0
        }
    },
    methods: {
        // ...mapMutations(["getBlogsByTitle"]),
        goHome() {
            this.$router.push('/home')
        },
        getBlogsByType(index) {
            this.blogType = index + 1
            // requests.get(`http://localhost:3000/api/blog/getBlogByType/${this.blogType}`).then(res => {
            //     this.$store.commit("getBlogByType",res.data)
            // })
            this.$router.push({
                name: 'home',
                query: {
                    blogType:this.blogType
                }
            })
        },

        goSearch: _.throttle(function () {
            requests.post('http://localhost:3000/api/blogs/getBlogsByTitle', {
                    keyword: this.input
                }).then(res => {
                    this.$router.push({
                        name: "home",
                        query: {
                            keyword: this.input
                        }
                    })
                    this.$store.commit("getBlogsByTitle", res.data)
                    // this.getBlogsByType(res.data)
                    this.input = ''
                })
        }, 1500)    
                // requests.post('http://localhost:3000/api/blog/getBlogsByTitle', {
                //     keyword: this.input
                // }).then(res => {
                //     this.$router.push({
                //         name: "home",
                //         query: {
                //             keyword: this.input
                //         }
                //     })
                //     this.$store.commit("getBlogsByTitle", res.data)
                //     // this.getBlogsByType(res.data)
                //     this.input = ''
                // })
                        
    },
    computed: {
        ...mapState(['blogs'])
    }
}
</script>

<style lang="scss" scoped>
.el-header {
    padding: 0;
    width: 100%;
    line-height: 60px;
    border-bottom: 1px solid #eaeaea;

    .el-col {
        border: 1px solid transparent;
        text-align: center;

        .headerBTn {
            width: 100px;
        }

        .el-input__inner {
            height: 30px !important;
        }

        .headerFlex {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: space-around;

            .flex {
                &:hover {
                    color: #6aa2e4;
                    cursor: pointer;
                }

                .el-dropdown-link {
                    cursor: pointer;

                }

                .el-icon-arrow-down {
                    font-size: 16px;

                }

                .el-dropdown {
                    color: black;
                    font-size: 16px;
                    font-family: "SourceCodePro-Regular;  Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

                    &:hover {
                        color: #6aa2e4;
                    }
                }

            }

        }

        .headerIcon {
            width: 80%;
            height: 30px;
            line-height: 30px;
            margin-top: 14px;
            background: url(./images/logo.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &:hover{
                cursor: pointer;
            }
        }
    }

}
</style>