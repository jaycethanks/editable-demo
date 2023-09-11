<script lang="ts" setup>
import AddColSvgIcon from "@/components/icons/AddColSvgIcon.vue";
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref, toRaw } from "vue";

const props = withDefaults(
    defineProps<{
        text: string;
    }>(),
  {
      text: "追加列",
    }
);
const emit = defineEmits(["confirm", "cancel"]);
const visible = ref(false);
const setVisible = (ifVisible:boolean)=>{ visible.value = ifVisible}
const ruleFormRef = ref<FormInstance>();
const colNameInputRef = ref<HTMLInputElement>()
const ruleForm = reactive({
  colName: "",
  colProp: "",
});



const handleAddColClick = ()=>{
    setVisible(true)
    colNameInputRef?.value?.focus()
}

const colNameValidator = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("列名不可为空"));
  } else {
    if (value.length > 10) {
      callback(new Error("长度不可超过10个字符"));
    }
    // if (ruleForm.checkPass !== "") {
    //   if (!ruleFormRef.value) return;
    //   ruleFormRef.value.validateField("checkPass", () => null);
    // }
    callback();
  }
};
const colPropValidator = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("列索引不可为空"));
  } else {
    const regex = /\b[a-z]+\b/g;
    if (!value.match(regex)) {
      callback(new Error("列索引须为全小写单词!"));
    } else {
      callback();
    }
  }
};
const rules = reactive<FormRules<typeof ruleForm>>({
  colName: [{ validator: colNameValidator, trigger: "blur" }],
  colProp: [{ validator: colPropValidator, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      emit("confirm", toRaw(ruleForm));
      setVisible(false)
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const handleBlur  = ()=>{
    console.log("blur")
}
</script>
<template>
  <el-popover  @click.stop @blur="handleBlur" :visible="visible" width="auto" hide-icon trigger="click">
    <template #default>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="插入列名" prop="colName">
          <el-input class="form-input" ref="colNameInputRef" maxlength="10" size="small" v-model="ruleForm.colName" />
        </el-form-item>
        <el-form-item label="插入索引" prop="colProp">
          <el-input class="form-input" maxlength="10" size="small" v-model="ruleForm.colProp" />
        </el-form-item>
            <p class="operate-row">
                <span class="left">

                    <el-button
                    type="primary"
                    size="small"
                    @click="submitForm(ruleFormRef)"
                    >确定</el-button
                    >
                    <el-button size="small" @click="resetForm(ruleFormRef)"
                    >重置</el-button
                    >
                </span>
                <span class="right">
                    <el-button size="small" @click="resetForm(ruleFormRef);setVisible(false)"
                    >取消操作</el-button
                    >
                </span>
            </p>
      </el-form>
    </template>
    <template #reference>
      <el-button @click="handleAddColClick" link size="small" class="col-add-btn" type="primary">
        <AddColSvgIcon class="operate-btn" />{{props.text}}
      </el-button>
    </template>
  </el-popover>
</template>

<style lang="less" scoped>
.el-table th{
  .col-add-btn {
    opacity: 0;
  }
  &:hover {
    .col-add-btn {
      opacity: 1;
    }
  }
}
.col-add-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.form-input{
    width: 150px;
}
.operate-row{
    width: 100%;
   display: flex;
   justify-content: space-between; 
}
.operate-btn {
  margin-right: 0.4em;
}
</style>
