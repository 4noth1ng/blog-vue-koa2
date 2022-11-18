<template>
    <el-footer>
        <el-row type="flex">
            <el-col :span="4"></el-col>
            <el-col :span="16">
                <div class="footerFlex">
                    <div class="flex">
                        <el-button type="text">JavaScript基础</el-button>
                    </div>
                    <div class="flex">
                        <el-button type="text">ES6阮一峰</el-button>
                    </div>
                    <div class="flex">
                        <el-button type="text">JavaScript高级笔记</el-button>
                    </div>
                    <div class="flex">
                        <el-button type="text">Vue文档</el-button>
                    </div>
                    <div class="flex">
                        <el-button type="text">koa2文档</el-button>
                    </div>
                    <div class="flex">
                        <el-button type="text">Leetcode</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="4"></el-col>
        </el-row>
    </el-footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.el-footer {
    margin-top: 20px;
    width: 100%;
    line-height: 60px;
    border-top: 1px solid #eaeaea;
    padding: 0;

    .el-col {
        border: 1px solid transparent;
        text-align: center;

        .footerFlex{
            display: flex;
            justify-content:space-between;
        }
    }
}
</style>