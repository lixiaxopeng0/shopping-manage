<template>
    <div>
        <div id="main" :style="myStyle"></div>
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
    mounted() {
        let myChart = this.$echarts.init(document.getElementById('main'));
        myChart.setOption(this.$props.options);

    },
};
</script>
