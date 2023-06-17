<template>
    <div class="shopping-list">ShopList</div>
</template>
<script>
import shop from '@/api/shop';
export default {
    name: 'ShopList',
    data() {
        return {
            list: [],
        };
    },
    methods: {
        async getList() {
            try {
                const data = await shop.getList();
                console.log(data, '==data=');
            } catch (e) {
                this.list;
            }
        },
    },
    mounted() {
        this.getList();
    }
};
</script>
