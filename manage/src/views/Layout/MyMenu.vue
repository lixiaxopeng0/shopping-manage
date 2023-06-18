<template>
    <div>
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="isCollapse"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
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
                    <span slot="title" class="info-title">信息管理</span>
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
import { BASE_URL } from '@/dicts/route';
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
            defaultActive: 'home'
        };
    },
    created() {
        this.defaultActive = this.$route.path.split(`${BASE_URL}/`)?.[1];
        // console.log(this.defaultActive);
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

.info-title {
    color: #ede2e2
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
