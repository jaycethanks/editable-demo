<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";

const tableRef = ref<HTMLTableElement>();
const computedTableSize = () => {
  const table = tableRef.value;
  const rows = table?.rows ?? [];
  const rowsLength = rows.length;
  const columnsLength = rows[0].cells.length;
  // init
  tableState.rows = [];
  tableState.cols = [];
  for (let i = 0; i < rowsLength; i++) {
    tableState.rows.push([
      rows[i].cells[0].offsetHeight,
      rows[i].cells[0].offsetTop,
    ]);
  }

  for (let i = 0; i < columnsLength; i++) {
    tableState.cols.push([
      rows[0].cells[i].offsetWidth,
      rows[0].cells[i].offsetLeft,
    ]);
  }

  console.log("tableState.cols", tableState);
  window.xx = tableRef.value;
};
onMounted(() => {
  computedTableSize();

  window.addEventListener("resize", computedTableSize);
});

type colState = [width: number, offSetLeft: number][];
type rowState = [height: number, offSetTop: number][];
interface tableStateType {
  cols: colState;
  rows: rowState;
}
const tableState = reactive<tableStateType>({
  cols: [],
  rows: [],
});
const operateState = reactive({
  operateBarWidth: 4,
  dotShrinkSize: 10,
  dotSize: 20,
  contextBarWidth: 20,
});
</script>
<template>
  <div class="edit-table-container">
    <div class="edit-table-root">
      <table class="edit-table" ref="tableRef">
        <colgroup>
          <col v-for="col in tableState.cols" :width="col[0]" />
        </colgroup>

        <tr>
          <th>Countries</th>
          <th>Capitals</th>
          <th>Population</th>
          <th>Language</th>
        </tr>
        <tr>
          <td>USA</td>
          <td>Washington, D.C.</td>
          <td>309 million</td>
          <td>English</td>
        </tr>
        <tr>
          <td>Sweden</td>
          <td>Stockholm</td>
          <td>9 million</td>
          <td>Swedish</td>
        </tr>
      </table>
      <div class="operation-mask">
        <div class="vertical">
          <div
            class="vertical-operate"
            :style="{ left: `${col[1]}px` }"
            v-for="col in tableState.cols"
          >
            <div
              class="operate-dot"
              :style="{
                left: `-${operateState.dotSize / 2}px`,
                top: `-${
                  operateState.contextBarWidth + operateState.dotSize
                }px`,
                height: `${operateState.dotSize}px`,
                lineHeight: `${operateState.dotSize}px`,

                width: `${operateState.dotSize}px`,
              }"
            >
              +
            </div>
            <div
              class="context-bar"
              :style="{
                width: col[0] + 'px',
                height: `${operateState.contextBarWidth}px`,
                top: `-${operateState.contextBarWidth}px`,
              }"
            ></div>
            <div
              class="operate-bar vertical-operate-bar"
              :style="{
                left: `-${operateState.operateBarWidth / 2}px`,
                width: `${operateState.operateBarWidth}px`,
              }"
            ></div>
          </div>
        </div>
        <!-- <div class="operate-bar vertical-operate-bar last" v-if="tableState.cols.length" :style="{width:`${operateState.operateBarWidth}px`,left:`${tableState.cols[tableState.cols.length-1][1] + tableState.cols[tableState.cols.length-1][0] - operateState.operateBarWidth/2}px`}"></div> -->

        <!-- <div class="operate-bar horizontal-operate-bar"  v-for="row in tableState.rows" :style="{top:`${row[1]-operateState.operateBarWidth/2}px`,height:`${operateState.operateBarWidth}px`}"></div> -->
        <!-- <div class="operate-bar horizontal-operate-bar last" v-if="tableState.rows.length" :style="{height:`${operateState.operateBarWidth}px`,top:`${tableState.rows[tableState.rows.length-1][1] + tableState.rows[tableState.rows.length-1][0] - operateState.operateBarWidth/2}px`}"></div> -->
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
table,
th,
td {
  padding: 5px;
  border: 1px solid rgb(222, 224, 227);
}
.edit-table-container {
  padding: 50px 10px 10px 50px;
  border: 1px solid red;
  .edit-table-root {
    position: relative;
    .edit-table {
      width: 100%;
      height: 100%;
    }
    .operation-mask {
      position: absolute;
      // background-color: #c065658a;
      pointer-events: none;
      inset: 0;
      .vertical {
        display: flex;
        .vertical-operate {
          pointer-events: none;
          position: absolute;
          box-sizing: border-box;
          // border: 1px solid red;
          height: 100%;

          &:last-child {
            .context-bar {
              border-top-right-radius: 10px;
            }
          }
          &:nth-child(1) {
            .context-bar {
              border-top-left-radius: 10px;
            }
          }

          .operate-dot {
            &:hover {
              ~ .operate-bar {
                opacity: 1;
              }
            }
          }
          .operate-bar {
            position: absolute;
            opacity: 0;
            transition: all .2s ease;
            background-color: #2735ff;
          }
          .context-bar {
            pointer-events: all;
            cursor: pointer;
            position: absolute;
            background-color: #eff0f1;
            transition: background 0.2s ease;
            &:hover {
              background-color: #dee0e3;
            }
          }
        }
      }
      .operate-dot {
        pointer-events: all;
        position: absolute;
        border-radius: 100%;
        text-align: center;
        transform: scale(0.4);
        cursor: pointer;
        transition: all 0.2s ease;
        background-color: #bbbfc4;
        color: #bbbfc4;
        &:hover {
          background-color: #2735ff;
          color: #fff;
          transform: scale(120%);
        }
      }

      .vertical-operate-bar {
        height: 100%;
      }
      .horizontal-operate-bar {
        width: 100%;
      }
    }
  }
}
</style>
