<script setup lang="ts">
import AdminItemDialog from "./adminItemDialog.vue";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";
const store = useCounterStore();

const inputData = ref("");

const searchTickets = () => {
  store.dataToShow = store.data.filter((el: { companyName: string }) => {
    return el.companyName.toUpperCase().includes(inputData.value.toUpperCase());
  });

  console.log(store.dataToShow);
};
</script>

<template>
  <div class="max-w-[1015px] basis-full m-auto gap-4 flex-between">
    <form class="flex-between basis-full gap-1 m-auto">
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        class="w-full"
        v-model="inputData"
        @input.prevent="searchTickets"
      />
      <Button type="submit" @click.prevent="searchTickets">Search</Button>
    </form>
    <AdminItemDialog />
  </div>
  <StockItemTable />
</template>

<style scoped>
button:hover {
  .icon {
    background-color: var(--green-500);
    fill: var(--green-500);
  }
}
</style>
