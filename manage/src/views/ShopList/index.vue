<template>
    <div class="shopping-list">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品列表</span>
            </div>
            <ListView :tableData="tableData.data" :total="tableData.total" :columns="columns" @request="getList"
                :showSearch="true" :searchName="searchName" :placeholder="placeholder" @operateClick="operateClick" />
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
            searchName: 'productName',
            placeholder: '请输入产品名称'
        };
    },
    methods: {
        async getList(params) {
            try {
                const data = await shop.getList(params);
                this.tableData = data;
            } catch (e) {
                this.tableData = { data: [], total: 0 };
            }
        },
        operateClick(...props) {
            switch (props[1]?.name) {
                case 'delete':
                    this.handleDelete(...props);
                    return;
            }
        },
        async handleDelete(item, { refresh }) {
            await shop.delete(item.id);
            refresh();
        }
    },
    // mounted() {
    //     this.getList();
    // }
};
</script>
