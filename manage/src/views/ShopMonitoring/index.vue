<template>
    <div class="shopping-monitoring">
        <PageHeader :showBack="false">数据监控</PageHeader>
        <MyEcharts :options="productOptions" :myStyle="myStyle" />
        <MyEcharts :options="resetOptions" :myStyle="myStyle" />
    </div>
</template>
<script>
import MyEcharts from '@/components/MyEcharts/index.vue';
import PageHeader from '@/components/PageHeader/index.vue';
import shop from '@/api/shop';
import store from '@/store';

export default {
    name: 'ShopMonitoring',
    components: {
        MyEcharts,
        PageHeader
    },
    data() {
        return {
            uuid: '',
            productOptions: {},
            resetOptions: {},
            myStyle: { height: '400px', width: '100%', padding: '20px' }
        };
    },
    mounted() {
        this.uuid = JSON.parse(store.state.userInfo)?.id;
        this.getClassify('productName').then(
            (res) => {
                const data = res.data || {};
                const isEmpty = !Object.keys(data)?.length;
                this.productOptions = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    title: { text: '商品售卖量' },
                    xAxis: {
                        type: 'category',
                        data: Object.keys(data)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: isEmpty ? [] : [
                        {
                            barMaxWidth: 30,
                            type: 'bar',
                            data: Object.values(data)?.map(i => (i.totalNumber - i.resetNumber))
                        }
                    ],
                };

                this.resetOptions = {
                    title: {
                        text: '商品售卖比较',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: isEmpty ? [] : [
                        {
                            type: 'pie',
                            radius: '50%',
                            data: Object.entries(data)?.map(([key, item]) => ({
                                name: key,
                                value: item.resetNumber,
                            })),
                        }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                };
            }
        ).catch(() => {
            this.productOptions = {};
        });
    },
    methods: {
        async getClassify(type) {
            const params = {
                type,
                uuid: this.uuid
            };
            try {
                const data = await shop.classify(params);
                return data;
            } catch (e) {
                this.$message({
                    type: 'error',
                    message: e.message,
                    showClose: true,
                    duration: 2000,
                });
                return {};
            }
        },
    }
};
</script>
