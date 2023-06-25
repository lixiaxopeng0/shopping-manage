<template>
    <div>
        <div class="layout">
            <MyMenu class="menu" @changeCollapse="changeCollapse" />
            <div class="content" :class="{ shrinkage: isCollapse }">
                <div></div>
                <div class="info-content"><router-view /></div>
            </div>
        </div>
    </div>
</template>
  
<script>
import MyMenu from '@/views/Layout/MyMenu.vue';
import { mapMutations } from 'vuex';

export default {
    name: 'BaseContent',
    components: {
        MyMenu,
    },
    data() {
        return {
            isCollapse: this.$store.state.isCollapse,
        };
    },
    methods: {
        ...mapMutations(['changeStoreCollapse']),
        changeCollapse(value) {
            this.isCollapse = value;
            this.changeStoreCollapse(value);
        }
    },
};
</script>
<style scoped lang="less">
.layout {
    .menu {
        position: fixed;
        top: var(--header-height);
        bottom: 0;
        background-color: var(--main-color);
        border-top: 1px solid #fff;
        z-index: 888;
    }

    .content {
        display: grid;
        grid-template-columns: var(--menu-collapse) 1fr;
    }

    .shrinkage {
        grid-template-columns: 64px 1fr;
    }

    .info-content {
        overflow: hidden;
    }
}
</style>
  