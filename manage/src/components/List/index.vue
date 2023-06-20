<template>
    <div>
        <div class="search-input" :class="{ 'only-search': !createText }">
            <el-button type="primary" icon="el-icon-plus" v-show="!!createText" @click="createClick">
                {{ createText }}
            </el-button>
            <div>
                <el-input :placeholder="placeholder" v-model="input" @keyup.enter.native="handleEnter" clearable
                    style="width: 240px" @clear="clear" v-show="!!showSearch">
                </el-input>
                <el-button icon="el-icon-refresh" style="margin-left: 10px" v-show="!!canRefresh"
                    @click="refresh('button')"></el-button>
            </div>

        </div>
        <el-table :data="data.tableData" :style="myStyle">
            <el-table-column v-for="({ label, prop, width = 'auto', operate, id, tooltip = false }) in columns" :prop="prop"
                :label="label" :width="width" v-bind:key="id" :show-overflow-tooltip="tooltip">
                <template slot-scope="scope">
                    <el-button type="text" size="small" v-for="item in operate" v-show="!!operate"
                        @click="operatesClick(scope.row, { ...item, refresh, index: scope.$index })" v-bind:key="item.name">
                        {{ item.text }}
                    </el-button>
                    {{ operate ? '' : (scope.row[prop] ?? '-') }}
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
        },
        createText: {
            type: String,
            default: '',
        },
        canRefresh: {
            type: Boolean,
            default: false,
        }
        // operateClick: {
        //     type: Function,
        //     default: null
        // }
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
            // loading: false,
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
        // 操作事件
        operatesClick(...props) {
            this.$emit('operateClick', ...props);
            // this.operateClick(...props);
        },
        // 刷新
        async refresh() {
            this.currentPage = 1;
            this.pageSize = 10;
            this.input = '';
            this.searchText = '';
            const params = {
                page: 1,
                pageSize: 10,
            };
            this.$emit('request', params);
        },
        clear() {
            this.searchText = '';
        },
        handleEnter() {
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
        },
        // 创建点击
        createClick() {
            this.$emit('createClick');
        }
    },

};
</script>
<style scoped lang="less">
.search-input {
    // position: relative;
    height: 40px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}

.only-search {
    justify-content: flex-end;
}

// .search-input>div {
//     position: absolute;
//     top: 0;
//     right: 0;
// }

.paginations {
    margin-top: 10px;
    text-align: end;
}

.el-pagination {
    display: inline-block;
}
</style>
