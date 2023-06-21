<template>
    <div class="filed" :style="{width: labelWidth ?? 'auto'}">
        <p class="label">{{ label }}:</p>
        <div class="field-value"><slot></slot></div>
    </div>
</template>
<script>
export default {
    name: 'ShowField',
    props: ['label', 'labelWidth']
}
</script>
<style lang="less" scoped>
.filed {
    display: flex;
    margin-bottom: 20px;

    .label {
        padding-right: 5px;
        min-width: 80px;
        text-align: start;
    }

    .field-value {
        display: flex;
        align-items: center;
    }
}
</style>