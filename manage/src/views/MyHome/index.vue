<template>
    <div>
        <div class="block">
            <div class="carousel-content">
                <el-carousel trigger="click" height="240px">
                    <el-carousel-item v-for="({ title, content }) in carouselData" :key="title">
                        <div class="carousel-item-content">
                            <h2>{{ title }}</h2>
                            <div>{{ content }}</div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统功能</span>
            </div>
            <div v-for="item in feature" :key="item.url" class="links">
                <router-link :to="item.url" @click="click(item)">{{ item.text }}</router-link>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'MyHome',
    data() {
        return {
            carouselData: [
                {
                    title: '商品列表',
                    content: '商品列表是指一种用来展示商品信息的列表性质的数据结构或页面布局。在电商平台、在线商店和其他类型的产品展示网站中，商品列表通常是非常重要的一部分，用于向用户展示该网站中提供的商品，并提供简要的信息、价格等重要属性，用以促成销售和交易。'
                },
                {
                    title: '数据监控',
                    content: '数据监控（Data Monitoring）是指对特定数据流程、应用程序和系统进行跟踪、分析、记录和报告，以确保其数据质量和性能。数据监控旨在提供一种全面了解数据流程的方法，从而更好地管理数据质量、性能和安全'
                }
            ],
            feature: [
                { text: '商品列表', url: '/base/shop-list' },
                { text: '数据监控', url: '/base/shop-monitoring' },
            ]
        };
    }
};
</script>
<style scoped lang="less">
.block {
    --height: 240px;

    height: var(--height);
    background: #d3dce6;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .el-carousel__item {
        .carousel-item-content {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            margin: 0;
            padding: 0 20px;

            h2 {
                padding: 20px 0;
            }
        }
    }


    .carousel-content {
        width: 800px;
    }
}


.links {
    margin-bottom: 10px;
}
</style>
