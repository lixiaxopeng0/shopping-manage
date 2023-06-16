<template>
    <div class="layout">
        <MyMenu class="menu" />
        <MyContent class="content" />
    </div>
</template>
  
<script>
import MyMenu from './MyMenu.vue';
import MyContent from './MyContent.vue';

export default {
    name: 'MyLayout',
    components: {
        MyContent,
        MyMenu
    }
};
</script>
<style scoped lang="less">
.layout {
    .menu {
        width: 200px;
        height: 100vh;
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: var(--main-color);
    }

    .content {
        margin-left: 200px;
    }

}
</style>
  