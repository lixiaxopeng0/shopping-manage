<template>
    <el-dialog :title="title" :visible.sync="visible" @close="close" width="500px">
        <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="商品名称" :label-width="formLabelWidth" prop="productName">
                <el-input v-model="form.productName" autocomplete="off" :style="myStyle"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" :label-width="formLabelWidth" prop="imageUrl">
                <el-upload action="none" accept=".jpg,.png,.jpeg" v-model="form.imageUrl" list-type="picture-card"
                    :class="{ 'one-file': !!form.imageUrl }" :auto-upload="false" :limit="1" :on-change="onChange"
                    ref="upload" :file-list="fileList">
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
            <el-form-item label="商品单价" :label-width="formLabelWidth" prop="price">
                <el-input-number v-model="form.price" :step="1" :precision="0" :min="1" label="商品单价"
                    :style="myStyle"></el-input-number>
            </el-form-item>
            <el-form-item label="商品数量" :label-width="formLabelWidth" prop="total">
                <el-input-number v-model="form.total" :step="1" :precision="0" :min="1" label="商品数量"
                    :style="myStyle"></el-input-number>
            </el-form-item>
            <el-form-item label="商品描述" :label-width="formLabelWidth" prop="description">
                <el-input type="textarea" v-model="form.description" :style="myStyle"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import shop from '@/api/shop';

export default {
    name: 'OperateItem',
    props: {
        resource: {
            type: Object,
            default: () => ({
                productName: '',
                name: '',
                total: '',
                createTime: null,
                description: '',
                price: 0,
                imageUrl: '',
            }),
        },
        dialogFormVisible: {
            type: Boolean,
            default: false,
            required: true,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            editBool: false,
            title: '新建商品',
            formLabelWidth: '120px',
            form: {
                productName: '',
                total: '',
                description: '',
                price: 0,
                file: null,
                imageUrl: '',
                // 创建人
                name: '',
            },
            fileList: [],
            // disabled: false,
            visible: false,
            myStyle: { width: '240px' },
            rules: {
                productName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                ],
                total: [
                    { type: 'integer', required: true, message: '请输入商品数量', trigger: 'blur' },
                    { validator: this.checkNumber, min: 1, max: 1000, message: '数值在1-1000', trigger: 'blur' },
                ],
                price: [
                    { type: 'number', required: true, message: '请输入商品单价', trigger: 'blur' },
                    { validator: this.checkNumber, min: 1, max: 1000000, message: '数值在1-1000000', trigger: 'blur' },
                ],
                imageUrl: [
                    { required: true, message: '请选择商品图片', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入商品描述', trigger: 'blur' },
                    { min: 1, max: 1000, message: '长度在 2 到 1000 个字符', trigger: 'blur' },
                ],
            }
        };
    },
    watch: {
        dialogFormVisible(value) {
            this.visible = value;
            this.title = this.$props.isEdit ? '编辑商品' : '新建商品';
        },
        resource(value) {
            // this.$nextTick(() => {
            // });
            this.form = { imageUrl: '', ...value };
            this.fileList = this.form.imageUrl ? [{ url: this.form.imageUrl, name: '' }] : [];
        },
    },
    destroyed() {
        this.form.imageUrl?.includes('blob') && URL.revokeObjectURL(this.form.imageUrl);
    },
    methods: {
        checkNumber(rule, value, callback) {
            const { min, max, message } = rule;
            if (min <= value && value <= max) {
                callback();
            } else {
                callback(new Error(message));
            }
        },
        close(formName) {
            this.form = {
                productName: '',
                total: '',
                description: '',
                price: 0,
                file: null,
                imageUrl: '',
                name: '',
            };
            this.fileList = [];
            this.$refs[formName || 'ruleForm'].resetFields();
            this.$refs.upload.clearFiles();
            this.$emit('closeModal');
        },
        // upload的onChange
        onChange(file) {
            this.form.imageUrl = URL.createObjectURL(file.raw);
            this.form.file = file;

        },
        handleRemove() {
            this.form.file = null;
            this.form.imageUrl = '';
            this.$refs.upload.clearFiles();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$data.form = { ...this.form };
                    this.onOk(this.form);
                } else {
                    return false;
                }
            });
        },
        async onOk(formdata) {
            try {
                const { file, ...props } = formdata;
                const formData = new FormData();
                Object.keys(file || {}).forEach((key) => {
                    if (file[key]) {
                        formData.append(key, file[key]);
                    }
                });
                formData.append('result', JSON.stringify(props));
                if (this.$props.isEdit) {
                    await shop.update(formData);
                } else {
                    await shop.post(formData);
                }
                this.$message({
                    type: 'success',
                    message: this.$props.isEdit ? '更新成功' : '创建成功',
                    showClose: true,
                    duration: 2000
                });
                this.close();
                this.$emit('refresh');
            } catch (e) {
                this.$message({
                    type: 'error',
                    message: e?.message,
                    showClose: true,
                    duration: 2000
                });
            }
        }
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        //     // this.close();
        // }
    }
};
</script>
<style scoped lang="less">
::v-deep .one-file .el-upload {
    display: none;
}
</style>
