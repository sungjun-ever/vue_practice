<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>
<script>
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
            const rootData = this.$root.$data;
            this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
            let win = false;
            
            if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
                win = true
            }
            if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
                win = true;
            }
            if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
                win = true
            }
            if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
                win = true
            }

            if (win) {
                rootData.winner = rootData.turn;
                timeout[0] = setTimeout(()=>{
                    rootData.turn ='O';
                    rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                    rootData.winner = '';
                }, 3000)
            } else { // 무승부
                let all = true; // all = true는 무승부
                rootData.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });
                if (all) { // 무승부
                    alert('무승부 입니다.');
                    timeout[1] = setTimeout(()=>{
                        rootData.turn ='O';
                        rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                        rootData.winner = '';
                    }, 3000)
                } else {
                    rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                }
            }   
        }
    },

    beforeDestroy() {
        timeout.forEach((t) => {
            clearTimeout(t);
        });
    },

}
</script>
