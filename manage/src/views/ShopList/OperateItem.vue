<template>
    <el-dialog title="收货地址" :visible.sync="visible" @close="close" width="500px">
        <el-form :model="form">
            <el-form-item label="产品名称" :label-width="formLabelWidth">
                <el-input v-model="form.productName" autocomplete="off" :style="myStyle"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1" :on-success="onSuccess">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions ">
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品单价" :label-width="formLabelWidth">
                <el-input-number v-model="form.price" :step="1" :precision="0" :min="1" label="商品单价"
                    :style="myStyle"></el-input-number>
            </el-form-item>
            <el-form-item label="商品数量" :label-width="formLabelWidth">
                <el-input-number v-model="form.total" :step="1" :precision="0" :min="1" label="商品数量"
                    :style="myStyle"></el-input-number>
            </el-form-item>
            <el-form-item label="活动形式" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.description" :style="myStyle"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="close">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
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
            }),
        },
        dialogFormVisible: {
            type: Boolean,
            default: false,
            required: true,
        },
        // dialogFormVisible: {
        //     type: Boolean,
        //     default: false,
        //     required: true,
        // },
    },
    data() {
        return {
            formLabelWidth: '120px',
            form: {
                productName: '',
                name: '',
                total: '',
                createTime: null,
                description: '',
                price: 0,
                file: '',
            },
            disabled: false,
            visible: false,
            myStyle: { width: '240px' }
        };
    },
    watch: {
        dialogFormVisible(value) {
            this.visible = value;
        }
    },
    methods: {
        close() {
            this.$emit('closeModal');
        },
        onSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.form.file = file;
        },
        handleRemove() {
            this.form.file = null;
        }
    }
};
</script>
<style scoped lang="less">
.one-file {}
</style>
