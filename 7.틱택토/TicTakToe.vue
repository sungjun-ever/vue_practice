<template>
    <div>
        <div>{{turn}}의 턴입니다.</div>
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{winner}}의 승리입니다.</div>
    </div>
</template>
<script>
    import TableComponent from './TableComponent';

    export default {
        components: {
            TableComponent,
        },

        data() {
            return {
               tableData: [
                   ['', '', ''], 
                   ['', '', ''], 
                   ['', '', ''],
               ],

               turn: 'O',
               winner: '',
            };
        },
        methods: {
            
        },   
    }
</script>
<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>
