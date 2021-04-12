<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>
<script>
    import EventBus from './eventBus';

    let timeout = [];
    export default {
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },

        methods: {
            onClickTd(){
                if (this.cellData) return;
                EventBus.$emit('onClickTd', this.rowIndex, this.cellIndex);
            }
        },
    }
</script>
