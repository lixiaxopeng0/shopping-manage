<template>
    <div class="login-full-screen">
        <div class="login-content" :class="{ register: activeName === 'register' }">
            <el-form :model="form" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="用户登录" name="login"></el-tab-pane>
                    <el-tab-pane label="用户注册" name="register"></el-tab-pane>
                </el-tabs>
                <el-form-item label="用户名" prop="name" :rules="{
                    required: true, message: '用户名不可为空', trigger: 'blur'
                }">
                    <el-input type="text" v-model="form.name" autocomplete="off" :style="style"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" v-show="activeName === 'register'" :rules="activeName === 'register' ? [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ] : []">
                    <el-input type="email" v-model="form.email" autocomplete="off" :style="style"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="{
                    required: true, message: '密码不可为空', trigger: 'blur'
                }">
                    <el-input type="password" v-model="form.password" autocomplete="off" :style="style"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" v-show="activeName === 'register'" :rules="activeName === 'register' ? {
                    required: true, message: '确认密码不可为空', trigger: 'blur'
                } : {}">
                    <el-input type="password" v-model="form.checkPass" autocomplete="off" :style="style"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import shop from '@/api/shop';
// import store from '@/store/index';
import { mapMutations } from "vuex";

export default {
    name: 'LoginView',
    data() {
        return {
            form: {
                name: '',
                password: '',
                checkPass: '',
                email: '',
            },
            style: { width: '240px' },
            activeName: 'login',
        };
    },
    methods: {
        ...mapMutations(['setToken']),
        ...mapMutations(['setUserInfo']),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onOk(formName);
                } else {
                    return false;
                }
            });

        },
        async onOk(formName) {
            try {
                let result = {};
                const isLogin = this.activeName === 'login';
                if (this.form.password !== this.form.checkPass && !isLogin) {
                    throw Error('确认密码不正确');
                }
                if (isLogin) {
                    const { data } = await shop.login(this.form);
                    result = data;
                } else {
                    const { data } = await shop.register(this.form);
                    result = data;
                }
                this.setToken(result);
                this.setUserInfo(result);
                this.resetForm(formName);
                this.$message({
                    type: 'success',
                    message: `${isLogin ? '登录' : '注册'}成功`,
                    showClose: true,
                    duration: 2000,
                });
                this.$router.push('/base/home');
            } catch (e) {
                this.$message({
                    type: 'error',
                    message: e?.message,
                    showClose: true,
                    duration: 2000,
                });
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.form = {
                name: '',
                password: '',
                checkPass: '',
                email: '',
            };
        },
    }
};
</script>
<style scoped lang="less">
.login-full-screen {
    /* 设置容器为相对定位 */
    position: relative;
    height: 100vh;
}

.login-full-screen::before {
    content: "";
    position: absolute;
    background: url('@/assets/background.jpeg') no-repeat center/cover;
    // 高斯模糊
    filter: blur(10px);
    height: 100vh;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.login-content {
    padding: 0 10px 10px 0;
    height: 300px;
    width: 400px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 2;
    left: 0;
}

.register {
    height: 360px;
}
</style>
