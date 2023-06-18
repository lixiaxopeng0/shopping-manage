<template>
    <div>
        <MyHeader class="headers" />
        <router-view />
    </div>
</template>
  
<script>
import MyHeader from '@/views/MyHeader/index.vue';

export default {
    name: 'MyLayout',
    components: {
        MyHeader,
    },
};
</script>
