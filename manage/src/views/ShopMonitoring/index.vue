<template>
    <div class="shopping-monitoring">
        <PageHeader :showBack="false">数据监控</PageHeader>
        <MyEcharts :options="{
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        }" />
    </div>
</template>
<script>
import MyEcharts from '@/components/MyEcharts/index.vue';
import PageHeader from '@/components/PageHeader/index.vue';
export default {
    name: 'ShopMonitoring',
    components: {
        MyEcharts,
        PageHeader
    }
};
</script>
