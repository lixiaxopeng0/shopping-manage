<template>
    <div>
        <div class="block">
            <div class="carousel-content">
                <el-carousel trigger="click" height="240px">
                    <el-carousel-item v-for="item in 2" :key="item">
                        <h3 class="small">{{ item }}</h3>
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
            feature: [
                {text: '商品列表', url: '/base/shop-list'},
                {text: '数据监控', url: '/base/shop-monitoring'},
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

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 240px;
        margin: 0;
    }

    .carousel-content {
        width: 800px;
    }
}


.links {
    margin-bottom: 10px;
}


</style>
