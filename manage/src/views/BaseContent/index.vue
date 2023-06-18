<template>
    <div>
        <div class="layout">
            <MyMenu class="menu" @changeCollapse="changeCollapse" />
            <div class="content" :class="{ shrinkage: isCollapse }">
                <div></div>
                <div><router-view /></div>
            </div>
        </div>
    </div>
</template>
  
<script>
import MyMenu from '@/views/Layout/MyMenu.vue';

export default {
    name: 'BaseContent',
    components: {
        MyMenu,
    },
    data() {
        return {
            isCollapse: false,
        };
    },
    methods: {
        changeCollapse(value) {
            this.isCollapse = value;
        }
    }
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
    }

    .content {
        display: grid;
        grid-template-columns: var(--menu-collapse) 1fr;
    }

    .shrinkage {
        .sider-collapse {
            grid-template-columns: 0 1fr;
        }
    }
}
</style>
  