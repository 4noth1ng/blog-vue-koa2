<template>
  <div class="father">
    <div class="header">
      <div class="title">
        <span style="padding-left:15px">标题：</span>
        <el-input placeholder="请输入内容" v-model="title"></el-input>
      </div>
      <div class="content">
        <span>简介：</span>
        <el-input placeholder="请输入内容" v-model="content"></el-input>
      </div>
      <div class="type">
        <el-radio-group v-model="blogType">
          <el-radio :label="1">CSS</el-radio>
          <el-radio :label="2">JavaScript</el-radio>
          <el-radio :label="3">Vue</el-radio>
          <el-radio :label="4">Node.js</el-radio>
          <el-radio :label="5">算法</el-radio>
        </el-radio-group>
      </div>

      <div class="btn">
        <el-button type="primary" @click="publish">发布</el-button>
      </div>

    </div>
    <div class="main">
      <mavon-editor v-model="value" ref="md"   style="height:100%;width: 100%;" />
      <el-button @click="t">tset</el-button>
    </div>
  </div>
</template>

<script>
import requests from '@/api/request';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      value:''
    }
  },
  methods: {
    t() {
      console.log(this.value);
    },
    publish() {
      if (!this.$route.query.id) {
        this.value = this.$refs.md.d_value
        this.createtime = Date.now()
        console.log(this.value);

        requests.post('http://localhost:3000/api/blog/publishBlogs', {
          title: this.title,
          content: this.content,
          createtime: this.createtime,
          blogType: this.blogType,
          blogText: this.value
        }).then(res => {
          if (res.errno === 0) {
            this.$message.success('发布成功！')
            this.$store.commit("editValue", this.value)
          }
        }).catch()
      } else {
        requests.post('http://localhost:3000/api/blog/updateBlog', {
          title:this.title,
          content:this.content,
          createtime:this.createtime,
          blogType:this.blogType,
          blogText: this.value,
          id:this.$route.query.id
        }).then(res => {
          if (res.errno === 0) {
            this.$message.success("更新成功！")
            this.$router.push({
              name:'blog'
            })
          }
        }).catch()
      }
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

    title:{
      get(){
        return this.$store.state.title
      },
      set(title) {
        this.$store.commit("editTitle",title)
      }
    },
    content: {
      get() {
        return this.$store.state.content
      },
      set(content) {
        this.$store.commit("editContent", content)
      }
    },
    createtime: {
      get() {
        return this.$store.state.createtime
      },
      set(createtime) {
        this.$store.commit("editCreatetime", createtime)
      }
    },
    blogType: {
      get() {
        return this.$store.state.blogType
      },
      set(blogType) {
        this.$store.commit("editBlogType", blogType)
      }
    },

  },
  mounted() {
    this.value = this.$store.state.value
    
  }
}
</script>

<style scoped lang="scss">
.father {
  width: 100%;
  height: 100%;
  border: 1px solid #e0e1e2;

  .header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    // border-bottom: 1px solid #e0e1e2;

    .title {
      width: 20%;
      height: 60px;
      line-height: 60px;
      float: left;

      .el-input {
        display: inline-block;
        width: 220px;
      }
    }


    .content {
      float: left;
      width: 25%;

      .el-input {
        display: inline-block;
        width: 300px;
      }
    }

    .type {
      float: left;
      width: 35%;
    }

    .btn {
      float: right;
      padding-right: 5px;
      width: 5%;
      height: 60px;
      line-height: 60px;
    }


  }

  .main {
    height: 770px;
    width: 100%;


  }
}
</style>