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
                    <!-- <el-avatar icon="el-icon-user-solid" size="small" :src="imageUrl"></el-avatar> -->
                    <div class="avatar-content">
                        <el-avatar fit="fit" :src="imageUrl" v-if="!!imageUrl" size="small"></el-avatar>
                        <el-avatar icon="el-icon-user-solid" size="small" v-else></el-avatar>
                        <span class="username">{{ username }}</span>
                    </div>
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
import store from '@/store';
import shop from '@/api/shop';

export default {
    name: 'MyHeader',
    // data() {
    //     return {
    //         imageUrl: '',
    //     };
    // },
    computed: {
        imageUrl() {
            return JSON.parse(store.state.userInfo)?.imageUrl;
        },
        username() {
            return JSON.parse(store.state.userInfo)?.name;
        }
    },
    methods: {
        ...mapMutations(['removeToken']),
        ...mapMutations(['setUserInfo']),
        async handleCommand() {
            try {
                await shop.exit(JSON.parse(store.state.userInfo));
                this.removeToken();
                this.setUserInfo({ exit: true });
                this.$message({
                    type: 'success',
                    message: '退出成功',
                    showClose: true,
                    duration: 2000
                });
                this.$router.push('/login');
            } catch (e) {
                this.$message({
                    type: 'error',
                    message: e.message,
                    showClose: true,
                    duration: 2000
                });
            }

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
    grid-template-columns: 200px 1fr 100px;
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

    .avatar-content {
        display: flex;
        align-items: center;

        .username {
            color: #fff;
            margin-left: 10px;
            font-size: 12px;
        }
    }
}




.head-position {
    height: var(--header-height);
}
</style>
