<template>
    <div>
        <el-menu default-active="home" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b" router>
            <el-menu-item index="home">
                <i class="iconfont icon-me_zhandianguanli"></i>
                <span slot="title">商品管理系统</span>
            </el-menu-item>
            <el-submenu index="shop">
                <template slot="title">
                    <i class="iconfont icon-me_wuziguanli"></i>
                    <span slot="title">商品管理</span>
                </template>
                <el-menu-item-group>
                    <span slot="title"></span>
                    <el-menu-item index="shop-list">
                        <i class="iconfont icon-gy_kucunwuziguanli"></i>
                        <span slot="title">商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="shop-monitoring">
                        <i class="iconfont icon-gy_tongjifenxi2"></i>
                        <span slot="title">数据监控</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <div class="stretch">
            <i class="iconfont icon-os-icon-outdent" @click="handleClick" v-if="isCollapse"></i>
            <i class="iconfont icon-a-os-icon-arrowindent" @click="handleClick" v-else></i>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'MyMenu',
    // props: [
    //     {
    //         isCollapse: Boolean,
    //         default: true,
    //     }
    // ],
    data() {
        return {
            isCollapse: false,
        };
    },
    methods: {
        handleClick() {
            this.isCollapse = !this.isCollapse;
            this.$emit('changeCollapse', this.isCollapse);
        }
    }
};
</script>
<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: var(--menu-collapse);
    min-height: 400px;
}

.iconfont {
    margin-right: 5px;
}

.stretch {
    position: absolute;
    bottom: 10px;
    margin-bottom: 10px;
    color: #fff;
    text-align: center;
    width: 100%;

    .iconfont {
        font-size: 20px;
        cursor: pointer;
    }
}
</style>
