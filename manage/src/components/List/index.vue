<template>
    <div>
        <div class="search-input">
            <el-input :placeholder="placeholder" v-model="input" @keyup.enter.native="handleEnter" clearable
                style="width: 240px" @clear="clear">
            </el-input>
        </div>
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
        showSearch: {
            type: Boolean,
            default: true,
        },
        searchName: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '请输入所搜内容'
        }
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
            input: '',
            searchText: '',
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
                ...(this.searchName && this.searchText ? { searchName: this.searchText } : {})
            };
            this.$emit('request', params);
            return params;
        },
    },
    methods: {
        clear() {
            this.searchText = '';
        },
        handleEnter() {
            console.log(this.input);
            if (this.searchName) {
                this.searchText = this.input;
            }
        },
        click(value) {
            this.currentPage = value;
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
.search-input {
    position: relative;
    height: 40px;
    margin-bottom: 10px;
}

.search-input>div {
    position: absolute;
    top: 0;
    right: 0;
}

.paginations {
    margin-top: 10px;
    text-align: end;
}

.el-pagination {
    display: inline-block;
}
</style>
