<template>
    <div class="shopping-list">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品列表</span>
            </div>
            <ListView :tableData="tableData.data" :total="tableData.total" :columns="columns" @request="getList"
                :showSearch="true" searchName="productName" placeholder="请输入产品名称" @operateClick="operateClick"
                createText="新建商品" @createClick="dialogFormVisible = true" ref="listView" />
        </el-card>
        <OperateItem :dialogFormVisible="dialogFormVisible" @closeModal="dialogFormVisible = false" @refresh="listRefresh" />
    </div>
</template>
<script>
import shop from '@/api/shop';
import ListView from '@/components/List';
import { columns } from './columns';
import OperateItem from './OperateItem.vue';

export default {
    name: 'ShopList',
    components: {
        ListView,
        OperateItem,
    },
    data() {
        return {
            tableData: [],
            columns,
            dialogFormVisible: false,
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
            this.$message({
                message: '删除成功',
                type: 'success',
                showClose: true,
                duration: 2000,
            });
            refresh();
        },
        listRefresh() {
            this.$refs.listView.refresh();
        }
    },
    // mounted() {
    //     this.getList();
    // }
};
</script>
