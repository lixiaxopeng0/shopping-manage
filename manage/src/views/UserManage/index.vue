<template>
    <div>
        <div class="user-content">
            <el-card class="box-card" style="width: 800px">
                <div class="avatar-content">
                    <el-avatar fit="fit" :src="avatarUrl" v-if="!!avatarUrl"></el-avatar>
                    <el-avatar icon="el-icon-user-solid" v-else></el-avatar>
                </div>
                <el-descriptions :border="true" :column="2">
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            用户名
                        </template>
                        {{ userInfo.name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-chat-line-round"></i>
                            邮箱
                        </template>
                        {{ userInfo.email }}
                    </el-descriptions-item>
                </el-descriptions>
                <el-collapse accordion v-model="activeName">
                    <el-collapse-item name="1">
                        <template slot="title">
                            用户编辑
                        </template>
                        <el-form :model="form" ref="rulForm" :rules="rules" label-width="100px" class="demo-dynamic">
                            <el-form-item label="商品图片" :label-width="formLabelWidth" prop="imageUrl">
                                <el-upload action="none" accept=".jpg,.png,.jpeg" v-model="form.imageUrl"
                                    list-type="picture-card" :class="{ 'one-file': !!imageUrl }" :auto-upload="false"
                                    :limit="1" :on-change="onChange" ref="upload" :file-list="fileList">
                                    {{ imageUrl }}
                                    <i slot="default" class="el-icon-plus"></i>
                                    <div slot="file" slot-scope="{file}">
                                        <img class="el-upload-list__item-thumbnail" :src="form.imageUrl" alt="">
                                        <span class="el-upload-list__item-actions ">
                                            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                                <i class="el-icon-delete"></i>
                                            </span>
                                        </span>
                                    </div>
                                </el-upload>
                            </el-form-item>
                            <el-form-item prop="name" :label-width="formLabelWidth" label="用户名">
                                <el-input v-model="form.name" :style="style"></el-input>
                            </el-form-item>
                            <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
                                <el-input v-model="form.email" :style="style"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('rulForm')">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </div>
    </div>
</template>
<script>
import shop from '@/api/shop';
import { mapMutations } from 'vuex';
export default {
    name: 'UserManage',
    data() {
        return {
            activeName: '',
            avatarUrl: '',
            userInfo: {
                name: '',
                email: '',
                imageUrl: ''
            },
            formLabelWidth: '80px',
            style: { width: '240px' },
            fileList: [],
            form: {
                name: '',
                email: '',
                imageUrl: '',
                file: '',
            },
            imageUrl: '',
            rules: {
                imageUrl: [
                    { required: true, message: '请选择商品图片', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '用户名必填', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        };
    },
    destroyed() {
        this.imageUrl?.includes('blob') && URL.revokeObjectURL(this.form.imageUrl);
    },
    mounted() {
        const data = JSON.parse(this.$store.state.userInfo);
        this.form = data;
        this.userInfo = { ...data };
        const imageUrl = data.imageUrl;
        this.imageUrl = imageUrl;
        this.avatarUrl = imageUrl;
        this.fileList = imageUrl ? [{ url: imageUrl, name: '' }] : [];
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        handleRemove() {
            this.form.file = null;
            this.show = false;
            this.imageUrl = '';
            this.$refs.upload.clearFiles();
        },
        // upload的onChange
        onChange(file) {
            this.form.imageUrl = URL.createObjectURL(file.raw);
            this.imageUrl = this.form.imageUrl;
            this.form.file = file;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onOk();
                } else {
                    return false;
                }
            });
        },
        async onOk() {
            try {
                const { file, ...props } = this.form;
                const formData = new FormData();
                Object.keys(file || {}).forEach((key) => {
                    if (file[key]) {
                        formData.append(key, file[key]);
                    }
                });
                formData.append('result', JSON.stringify({ ...props, username: this.userInfo?.name, uuid: this.userInfo.id }));
                const { data } = await shop.avatarUpdate(formData);
                this.setUserInfo({ userInfo: data });
                const imageUrl = data?.imageUrl;
                this.avatarUrl = imageUrl;
                this.fileList = imageUrl ? [{ url: imageUrl, name: '' }] : [];
                this.activeName = '';
                this.$message({
                    type: 'success',
                    message: '更新成功',
                    showClose: true,
                    duration: 2000
                });
            } catch (e) {
                this.$message({
                    type: 'error',
                    message: e.message,
                    showClose: true,
                    duration: 2000
                });
            }
        }
    },
};
</script>
<style lang="less" scoped>
.user-content {
    // position: relative;
    display: flex;
    justify-content: center;
}

.box-card {
    margin-top: 20px;
}
// .box-card {
//     position: absolute;
//     left: 50%;
//     transform: translateX(-50%);
//     top: 20px;
//     padding: 20px;
// }

.avatar-content {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

::v-deep .one-file .el-upload {
    display: none;
}
</style>
