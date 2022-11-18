<template>
    <div class="background">
        <div class="login" @keyup.enter="login">
            <div class="header">个人博客管理系统</div>
            <div class="footer">
                <div class="username">
                    <el-input v-model="username" placeholder="用户名">   
                    </el-input>
                </div>
                <div class="password">
                    <el-input v-model="password" placeholder="密码" show-password></el-input>
                </div>
            </div>
            <div class="loginBtn" >
                <el-button type="primary" style="width:400px" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import requests from '@/api/request';
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            console.log(this.username);
            console.log(this.password);
            requests.post('http://localhost:3000/api/users/login', {
                username: this.username,
                password: this.password
            }).then(res => {
                if (res.errno === 0) {
                    localStorage.setItem('token',res.message)
                    this.$message.success(`欢迎登录！`)
                    setTimeout(() => {
                        this.$router.push('/blog/home')
                    }, 1000);
                    clearTimeout()
                } else {
                    this.$message.error('登录失败！请检查用户名与密码')
                }
            })
        }
    },
}
</script>

<style scoped lang="scss">
.background{
        width: 100vw;
        height: 100vh;
        background-color: #eaeaea;
        background: url("./images/elena-joland-mjeQon0Mh_Q-unsplash.10644a6a.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;

        .login{
            position: absolute;
            width: 600px;
            height: 300px;
            background-color: #f6f5f0;
            border: 1px solid #d2d2d2;
            top:50vh;
            left:50vw;
            margin-left: -300px;
            margin-top: -200px;

            .header{
                height: 50px;
                width: 100%;
                line-height: 50px;
                text-align: center;
                font-size: 18px;
                border-bottom: 1px solid #eaeaea;
                color: grey;
            }

            .footer{
                
                width: 400px;
                margin-top: 40px;
                margin-left: 100px;
                height: 100px;
                .password{
                    margin-top: 20px;
                }
            }
            .loginBtn{
                width: 100%;
                text-align: center;
                height: 50px;
                margin-top: 40px;
            }
        }
    }
</style>