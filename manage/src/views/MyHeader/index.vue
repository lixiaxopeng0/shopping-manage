<template>
    <div>
        <div class="manage-head">我是头部</div>
        <div class="head-position"></div>
    </div>
</template>
<script>
export default {
    name: 'MyHeader',
};
</script>
<style scoped lang="less">
.manage-head {
    position: fixed;
    height: var(--header-height);
    background-color: var(--main-color);
    width: 100%;
    z-index: 888;
}

.head-position {
    height: var(--header-height);
}
</style>
