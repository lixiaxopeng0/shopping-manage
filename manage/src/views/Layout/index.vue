<template>
    <div>
        <MyHeader class="headers" />
        <div class="layout">
            <MyMenu class="menu" @changeCollapse="changeCollapse" />
            <MyContent class="content" :class="{ shrinkage: isCollapse }" />
        </div>
    </div>
</template>
  
<script>
import MyMenu from './MyMenu.vue';
import MyContent from './MyContent.vue';
import MyHeader from '@/views/MyHeader/index.vue';

export default {
    name: 'MyLayout',
    components: {
        MyContent,
        MyMenu,
        MyHeader,
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
        margin-left: var(--menu-collapse);
    }

    .shrinkage {
        margin-left: 64px;
    }

}
</style>
  