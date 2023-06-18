<template>
    <div>
        <el-table :data="data.tableData" :style="myStyle">
            <el-table-column v-for="({ label, prop, width = 'auto', render, id, tooltip = false }) in columns" :prop="prop"
                :label="label" :width="width" v-bind:key="id" :show-overflow-tooltip="tooltip">
                <template slot-scope="scope">
                    {{ render ? render(scope) : scope.row[prop] }}
                </template>
            </el-table-column>
        </el-table>
        <div class="paginations" v-show="showPaginations">
            <span v-show="false">{{ changeParamas.page }}</span>
            <el-pagination :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="data.total" @next-click="click" @prev-click="click"
                @current-change="currentChange" @size-change="sizeChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListView',
    props: {
        tableData: {
            type: Array,
            required: true,
            default: () => ([]),
        },
        total: {
            type: Number,
            default: 0,
        },
        columns: {
            type: Array,
            default: () => [],
            required: true,
        },
        myStyle: {
            type: Object,
            default: () => ({ width: '100%' })
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 30, 40]
        },
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            data: {
                tableData: [],
                total: 0,
            },
            showPaginations: false,
        };
    },
    watch: {
        tableData(value) {
            this.data.tableData = value;
        },
        total(value) {
            this.data.total = value;
            this.showPaginations = value > this.pageSize;
        }
    },
    // mounted() {
    //     this.$emit('request', {
    //         page: this.currentPage,
    //         pageSize: this.pageSize,
    //     });
    // },
    computed: {
        // 监听页码相关数值变化
        changeParamas() {
            const params = {
                page: this.currentPage,
                pageSize: this.pageSize,
            };
            this.$emit('request', params);
            return params;
        },
    },
    methods: {
        click(value) {
            this.currentPage = value;
            console.log(value, '-va-');

        },
        currentChange(value) {
            this.currentPage = value;
        },
        sizeChange(value) {
            this.pageSize = value;
        }
    },

};
</script>
<style scoped lang="less">
.paginations {
    margin-top: 10px;
    text-align: end;
}

.el-pagination {
    display: inline-block;
}
</style>
