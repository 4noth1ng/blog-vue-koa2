<template>
  <div>
    <Header/>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16">
        <router-view></router-view>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import requests from '@/api/request'


export default {
  name: 'App',
  components: {
    Header,Footer
  },
  data() {
    return {
      value:'## 123'
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
    // requests.get('http://localhost:3000/api/blog/getBlogDetail/35')
    //   .then(res => {
    //     this.value = res.data[0].blogText
    //     console.log(this.value);
    //   })
  },
  
}
</script>

<style lang="scss" scoped>
.el-col {
  border: 1px solid transparent;
}
</style>
