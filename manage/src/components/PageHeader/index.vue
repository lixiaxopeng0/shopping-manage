<template>
    <el-row>
        <el-col :span="24">
            <div class="page-header">
                <el-button icon="el-icon-arrow-left" class="back-button" size="mini" @click="click"
                    v-show="showBack"></el-button>
                <slot></slot>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name: 'PageHeader',
    props: {
        showBack: {
            type: Boolean,
            default: true,
        }
    },
    methods: {
        click() {
            this.$emit('onBack');
        }
    }
};
</script>
<style lang="less" scoped>
.page-header {
    padding: 0 10px;
    display: flex;
    height: 50px;
    border-bottom: 1px solid #f4f2f2;
    box-shadow: 3px 3px 10px 0px #b7b6b6;
    margin-bottom: 10px;
    align-items: center;
}

.back-button::v-deep {
    margin-right: 10px;
}
</style>
