<template>
    <div>
        <PageHeader @onBack="onBack">返回商品列表</PageHeader>
        <div class="detail-content">
            <el-card class="box-card">
                <div slot="header">
                    <span>商品详情</span>
                </div>
                <div class="detail-info">
                    <div class="image" :class="{ 'one-image': !info.imageUrl }">
                        <img :src="info.imageUrl" alt="暂时商品图片" />
                    </div>
                    <div class="info">
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <ShowField label="产品名称">{{ info.productName }}</ShowField>
                            </el-col>
                            <el-col :span="8">
                                <ShowField label="创建人">{{ info.name }}</ShowField>
                            </el-col>
                            <el-col :span="8">
                                <ShowField label="商品单价(元)">{{ info.price }}</ShowField>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <ShowField label="商品数量">{{ info.total }}</ShowField>
                            </el-col>
                            <el-col :span="8">
                                <ShowField label="商品剩余数量">{{ info.number }}</ShowField>
                            </el-col>
                            <el-col :span="8">
                                <ShowField label="上传时间">{{ info.createTime }}</ShowField>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <ShowField label="更新时间">{{ info.updateTime ?? '-' }}</ShowField>
                            </el-col>
                            <el-col :span="16">
                                <ShowField label="产品描述">{{ info.description }}</ShowField>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import ShowField from './ShowField.vue';
import shop from '@/api/shop';
import store from '@/store';
import PageHeader from '@/components/PageHeader/index.vue';

export default {
    name: 'ItemDetail',
    components: {
        ShowField,
        PageHeader,
    },
    data() {
        return {
            info: {
                productName: '',
                name: '',
                price: '',
                total: '',
                number: '',
                createTime: '',
                updateTime: '',
                imageUrl: '',
            },
        };
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        onBack() {
            this.$router.push('/base/shop-list');
        },
        async getDetail() {
            const { id } = this.$route.params;
            const { id: uuid } = JSON.parse(store.state.userInfo);
            try {
                const { data } = await shop.detail({ id, uuid });
                this.info = { imageUrl: '', ...data };
            } catch (e) {
                this.info = {
                    productName: '',
                    name: '',
                    price: '',
                    total: '',
                    number: '',
                    createTime: '',
                    updateTime: ''
                };
            }
        }
    }

};
</script>
<style scoped lang="less">
.detail-info {
    display: flex;

    .image {
        height: 220px;
        width: 200px;
        margin-right: 10px;

        img {
            width: 200px;
        }
    }

    .one-image {
        border: 1px solid #b7b6b6;
    }

    .info {
        flex: 1;
    }
}
</style>
