<script setup lang="ts">
import EditTable from './components/EditTable.vue'
import VxeTable from "@/components/VxeTable/index.vue"
import pureEditTable from "@/components/pureEditTable/index.vue"
</script>

<template>
  <div class="p-24 w-full flex flex-col justify-center gap-4">
    <EditTable class="border border-blue-500 border-solid w-[1000px]" msg="Vite + Vue" />
    <VxeTable/>
    <pureEditTable/>
  </div>
</template>

