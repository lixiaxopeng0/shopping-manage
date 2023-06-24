<template>
    <div>
        <div :id="chartId" :style="myStyle" :key="chartId"></div>
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
            default: () => ({ width: '600px', height: '400px' })
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
                this.myChart.setOption(value);
            }
        }
    },
    beforeDestroy() {
        // 确保数据不合并
        if (this.myChart) {
            this.myChart.dispose();
            this.clear();
        }
    }
};
</script>
