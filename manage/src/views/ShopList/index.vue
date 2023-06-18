<template>
    <div class="shopping-list">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品列表</span>
            </div>
            <ListView :tableData="tableData.data" :total="tableData.total" :columns="columns" @request="getList" />
        </el-card>
    </div>
</template>
<script>
import shop from '@/api/shop';
import ListView from '@/components/List';
import { columns } from './columns';

export default {
    name: 'ShopList',
    components: {
        ListView,
    },
    data() {
        return {
            tableData: [],
            columns,
        };
    },
    methods: {
        async getList(params) {
            try {
                console.log(params);
                const data = await shop.getList(params);
                this.tableData = data;
            } catch (e) {
                this.tableData = { data: [], total: 0 };
            }
        },
    },
    // mounted() {
    //     this.getList();
    // }
};
</script>
