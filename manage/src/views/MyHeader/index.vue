<template>
    <div>
        <div class="manage-head">
            <div class="manage-icon">
                <i class="iconfont icon-wendangguanlihoutai"></i>
                <span>商品后台管理</span>
            </div>
            <div class="space"></div>
            <div class="user">
                <el-dropdown @command="handleCommand">
                    <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="head-position"></div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    name: 'MyHeader',
    data() {
        return {

        };
    },
    methods: {
        ...mapMutations(['removeToken']),
        ...mapMutations(['setUserInfo']),
        handleCommand() {
            this.removeToken();
            this.setUserInfo({ login: false });
            this.$router.push('/login');
        }
    }
};
</script>
<style scoped lang="less">
.manage-head {
    position: fixed;
    height: var(--header-height);
    background-color: var(--main-color);
    width: 100%;
    z-index: 888;

    padding: 0 20px;
    display: grid;
    grid-template-columns: 200px 1fr 80px;
    align-items: center;

    .manage-icon {
        color: #ffd04b;

        .iconfont {
            font-size: 20px;
            font-size: 20px;
        }

        span {
            font-size: 14px;
            margin-left: 10px;
        }
    }

    .user {
        // border: 1px solid #fff;
        // height: 100%;
    }
}




.head-position {
    height: var(--header-height);
}
</style>
