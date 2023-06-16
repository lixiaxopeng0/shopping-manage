<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="4">
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
                    <el-menu-item index="monitoring">
                        <i class="iconfont icon-gy_tongjifenxi2"></i>
                        <span slot="title">数据监控</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
  
<script>
export default {
    name: 'MyMenu',
};
</script>
