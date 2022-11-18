<template>
  <el-aside width="auto" >
    <el-menu mode="vertical" :collapse="!isCollapse" class="el-menu-vertical-demo" :default-active="index">
      <el-menu-item index="1" @click="goBlog">
        <i class="el-icon-location"></i>
        <span class="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goWrite">
        <i class="el-icon-document"></i>
        <span class="title">撰写文章</span>
      </el-menu-item>
      <el-menu-item index="3" @click="goUsers">
        <i class="el-icon-menu"></i>
        <span class="title">用户管理</span>  
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      index:"1"
    }
  },
  methods: {
    goBlog() {
      this.$router.push('/home/blog')
    },
    goWrite() {
      this.$router.push('/home/write')
      console.log(123231);
    },
    goUsers() {
      this.$router.push('/home/user')
      console.log(1123);
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse
    }
  },
  mounted() {
    const url2 = this.$route.path
    switch (url2) {
      case "/home/blog": { this.index = "1"; break; }
      case "/home/write": { this.index = "2"; break; }
      case "/home/user": { this.index = "3"; break; }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside{
      .el-menu--collapse{
        min-height: 100vh;
        background-color: #304156;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
          background-color: #304156;
          width: 250px;
          min-height: 100vh;
          border-bottom: 1px solid #e6e6e6;

        }
        .el-menu-item{
          span{
            color:#b3bfce
          }
        }
  }
</style>