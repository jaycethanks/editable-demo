<script lang="ts" setup>
import InsertColumn from "./InsertColumn.vue";
import AddRowSvgIcon from "@/components/icons/AddRowSvgIcon.vue";
import { reactive } from "vue";
const state = reactive({
  columns: [
    {
      prop: "date",
      label: "Date",
      width: "180",
    },
    {
      prop: "name",
      label: "Name",
      width: "180",
    },
    {
      prop: "address",
      label: "Address",
    },
  ],
  tableData: [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ],
});

interface AddColumnType {
  colName: string;
  colProp: string;
}
const handleAppendColClick = ($index: number, form: AddColumnType) => {
  appendColumn($index, form);
};

const appendColumn = (index: number, { colName, colProp }: AddColumnType) => {
  state.columns.splice(index + 1, 0, { prop: colProp, label: colName });
};
const handleAppendRowClick = () => {
  const templateKeys = state.columns.map((col) => col.prop);
  const template: any = {};
  templateKeys.forEach((key) => {
    template[key] = "1 ";
  });
  state.tableData.push(template);
};
document.addEventListener("click",(e)=>{
  console.log('e',e)
})
</script>
<template>
  <div class="root">
    <el-table border :data="state.tableData" style="width: 100%">
      <el-table-column
        v-for="{ prop, label, width } in state.columns"
        :prop="prop"
        :label="label"
        :width="width"
      >
        <template #header="scope">
          {{ scope.column.label }}
          <InsertColumn
            text="插入列"
            @confirm="(form) => handleAppendColClick(scope.$index, form)"
          />
        </template>
      </el-table-column>
      <template #append>
        <el-button
          @click="handleAppendRowClick"
          link
          size="small"
          type="primary"
        >
          <AddRowSvgIcon class="operate-btn" /> 追加行
        </el-button>
      </template>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.operate-btn {
  margin-right: 0.4em;
}
</style>
