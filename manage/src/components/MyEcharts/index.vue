<template>
    <div>
        <div class="divs" :class="{ 'no-series': !options?.series?.length }">
            <div :id="chartId" ref="echartDom" :style="myStyle" :key="chartId"></div>
        </div>
        <div :style="myStyle" class="empty-content" v-show="!options?.series?.length">
            <i class="iconfont icon-zanwushuju"></i>
            暂无数据
        </div>
    </div>
</template>
<script>
export default {
    name: 'MyEcharts',
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
        myStyle: {
            type: Object,
            default: () => ({ width: '100%', height: '400px' })
        }
    },
    data() {
        return { myChart: null };
    },
    computed: {
        chartId() {
            let id = `myChart-${Math.random()}`;
            // 确保id唯一性
            let count = 0;
            while (document.getElementById(id) !== null) {
                id = `${id}-${count}`;
                count++;
            }
            // 返回唯一id
            return id;
        }
    },
    mounted() {
        this.myChart = this.$echarts.init(document.getElementById(this.chartId));
        this.myChart.setOption(this.$props.options);
    },
    watch: {
        options(value) {
            if (this.myChart) {
                console.log(!value?.series?.length);
                this.myChart.setOption(value);
            }
        }
    },
    beforeDestroy() {
        // 确保数据不合并
        if (this.myChart) {
            this.myChart.dispose();
            this.myChart.clear();
        }
    }
};
</script>
<style scoped lang="less">
.no-series {
    // display: none;
    // width: 0;
    height: 0;
    overflow: hidden;
}

.empty-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-bottom: 1px solid #8e8d8d;
    align-items: center;
    padding: 0 !important;
}

.iconfont {
    font-size: 60px;
    margin-bottom: 10px;
}
</style>
