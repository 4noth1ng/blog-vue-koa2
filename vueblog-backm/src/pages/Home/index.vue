<template>
  
  <el-container>
    <Tabnav></Tabnav>
    <el-container type="vertical">
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Header'
import Tabnav from '@/components/Tabnav'
export default {
  components: {
    Header,
    Tabnav
  }
}
</script>

<style scoped lang="scss">
.el-header {
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      line-height: 60px;
      padding: 0;
    }
.el-main{
  overflow:visible
}
</style>