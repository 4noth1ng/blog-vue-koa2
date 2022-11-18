<template>
    <div class="father">
        <h1>{{blogTitle}}</h1>
        <div class="info">
            <span class="createtime">
                {{blogCreatetime}}
            </span>
            <span class="blogType">
                文章分类：{{blogType}}
            </span>
        </div>
        <div class="blogText">
            <mavon-editor ref="md" :value="blogText" :subfield="prop.subfield" :defaultOpen="prop.defaultOpen"
                :toolbarsFlag="prop.toolbarsFlag" :editable="prop.editable" :scrollStyle="prop.scrollStyle">
            </mavon-editor>
        </div>
    </div>
</template>

<script>
import requests from '@/api/request';
export default {
    data() {
        return {
            blogText: '## 123',
            blogTitle: '',
            blogCreatetime: 1,
            blogType: 0,
            blogId: 0
        }
    },
    computed: {
        prop() {
            return {
                subfield: false, // 单双栏模式
                defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
                editable: false,
                toolbarsFlag: false,
                scrollStyle: true,
            };
        },
    },
    mounted() {
        this.blogId = this.$route.query.id
        requests.get(`http://localhost:3000/api/blogs/getBlogDetail/${this.blogId}`).then(res => {
            let { title, createtime, blogType, blogText } = res.data[0]
            switch (blogType) {
                case 1: { blogType = 'CSS'; break; }
                case 2: { blogType = 'JavaScript'; break; }
                case 3: { blogType = 'Vue'; break; }
                case 4: { blogType = 'Node.js'; break; }
                case 5: { blogType = '算法'; break; }
                default: break
            }
            this.blogCreatetime = this.timestampToTime(createtime)
            this.blogTitle = title
            this.blogType = blogType
            this.blogText = blogText
        })
    },
    methods: {
        timestampToTime(timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getHours()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            console.log(1);
            return Y + M + D + h + m + s;
        }

    }
}
</script>

<style lang="scss" scoped>
.father {
    margin-top: 60px;
    text-align: center;
    width: 100%;
    height: 100%;

    .info {
        margin-bottom: 30px;

        span {
            display: inline-block;
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #999;
            line-height: 20px;
        }

        .blogType {
            margin-left: 100px;
        }
    }

    .blogText{
        margin-bottom: 30px;
    }
}
</style>