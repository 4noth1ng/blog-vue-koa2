<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="title" label="标题" width="340">
            </el-table-column>
            <el-table-column prop="content" label="简介" width="340">
            </el-table-column>
            <el-table-column prop="createtime" label="发布时间" width="280">
            </el-table-column>
            <el-table-column prop="blogType" label="类别" width="250">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="editBlog(scope)">编辑</el-button>
                    <el-button @click="deleteBlog(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination" style="margin-top:30px;margin-left: 35vw;">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import requests from '@/api/request';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            tableData: [],
            total: 100,
            pagesize:11
        }
    },
    methods: {
        ...mapMutations(["editTitle", "editContent", "editValue", "editCreatetime", "editBlogType"]),
        timestampToTime(timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getHours()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        deleteBlog(scope) {
            console.log(scope.row.id);
            requests.post(`http://localhost:3000/api/blog/deleteBlogs/${scope.row.id}`)
                .then(res => {
                    if (res.errno === 0) {
                        this.$message.success('删除成功')
                        setTimeout(() => {
                            this.$router.go(0)
                        }, 1000);
                    }
                }).catch(() => {
                    this.$message.error('删除失败')
                })
        },
        editBlog(scope) {
            // console.log(scope.row);
            let {id,title,content,createtime,blogType,blogText} = scope.row
            // this.$store.commit("editTitle", title)
            // this.$store.commit("editContent", content)
            // this.$store.commit("editValue", value)
            // this.$store.commit("editCreatetime",)
            switch (blogType) {
                case "CSS": {
                    blogType = 1; break;
                }
                case "JavaScript": {
                    blogType = 2; break;
                }
                case "Vue": {
                    blogType = 3; break;
                }
                case "Node.js": {
                    blogType = 4; break;
                }
                case "算法": {
                    blogType = 5; break;
                }
                default: {
                    break
                }
            }
            this.editTitle(title)
            this.editCreatetime(createtime)
            this.editContent(content)
            this.editValue(blogText)
            this.editBlogType(blogType)
            this.$router.push({
                name: 'write',
                query: {
                    id
                }
            })
        },
        handleCurrentChange(page) {
            requests.get('http://localhost:3000/api/blog/getBlogs', {
                params: {
                    page,
                    limit: this.pagesize,
                    blogType:0
                }
            }).then(res => {
                this.tableData = res.data
                this.tableData.forEach(item => {
                    switch (item.blogType) {
                        case 1: { item.blogType = 'CSS'; break; }
                        case 2: { item.blogType = 'JavaScript'; break; }
                        case 3: { item.blogType = 'Vue'; break; }
                        case 4: { item.blogType = 'Node.js'; break; }
                        case 5: { item.blogType = '算法'; break; }
                        default: break;
                    }
                    item.createtime = this.timestampToTime(item.createtime)
                })
            })
        }
    },
    mounted() {
        requests.get('http://localhost:3000/api/blog/getBlogs', {
            params: {
                page: '1',
                limit: this.pagesize,
                blogType:0
            }
        }).then(res => {
            this.tableData = res.data
            this.tableData.forEach(item => {
                switch (item.blogType) {
                    case 1: { item.blogType = 'CSS'; break; }
                    case 2: { item.blogType = 'JavaScript'; break; }
                    case 3: { item.blogType = 'Vue'; break; }
                    case 4: { item.blogType = 'Node.js'; break; }
                    case 5: { item.blogType = '算法'; break; }
                    default: break;
                }
                item.createtime = this.timestampToTime(item.createtime)
            })
        }).catch(err => {
            
        })

        requests.get('http://localhost:3000/api/blog/getBlogsLength', {
            params: {
                blogType:0
            }
        })
            .then(res => {
                this.total = res.data[0]["COUNT(*)"]
        }).catch()
    }
}
</script>

<style>

</style>