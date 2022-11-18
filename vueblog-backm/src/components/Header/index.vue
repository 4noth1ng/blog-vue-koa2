<template>
  <div>
    <el-row type="flex">
        <el-col :span="4" >
            <i :class="icon" @click="collapse"></i>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            icon:'el-icon-s-fold'
        }
    },
    methods: {
        collapse() {
            const data = !this.isCollapse
            this.$store.dispatch('changeCollapse', data)
            if (data) {
                this.icon ='el-icon-s-fold'
            } else {
                this.icon = 'el-icon-s-unfold'
            }
        },
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-row{
        .el-col{
            line-height: 60px;
            i{
                font-size: 24px;
                padding-left: 20px;
            }
        }
    }
</style>