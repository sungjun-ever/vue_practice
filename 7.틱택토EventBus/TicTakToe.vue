<template>
    <div>
        <div>{{turn}}의 턴입니다.</div>
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{winner}}의 승리입니다.</div>
    </div>
</template>
<script>
    import TableComponent from './TableComponent';
    import EventBus from './eventBus';

    let timeout = [];
    export default {
        components: {
            TableComponent,
            EventBus,
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
            
            onClickTd(rowIndex, cellIndex){
                this.$set(this.tableData[rowIndex], cellIndex, this.turn);
                let win = false;
                
                if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
                    win = true
                }
                if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
                    win = true;
                }
                if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
                    win = true
                }
                if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
                    win = true
                }

                if (win) {
                    this.winner = this.turn;
                    timeout[0] = setTimeout(()=>{
                        this.turn ='O';
                        this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                        this.winner = '';
                    }, 3000)
                } else { // 무승부
                    let all = true; // all = true는 무승부
                    this.tableData.forEach((row) => {
                        row.forEach((cell) => {
                            if (!cell) {
                                all = false;
                            }
                        });
                    });
                    if (all) { // 무승부
                        alert('무승부 입니다.');
                        timeout[1] = setTimeout(()=>{
                            this.turn ='O';
                            this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                            this.winner = '';
                        }, 3000)
                    } else {
                        this.turn = this.turn === 'O' ? 'X' : 'O';
                    }
                }   
            }
        },
        
        created() {
            EventBus.$on('onClickTd', this.onClickTd); // 사용자 정의 이벤트 등록
        },

        beforeDestroy() {
            timeout.forEach((t) => {
                clearTimeout(t);
            });
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
