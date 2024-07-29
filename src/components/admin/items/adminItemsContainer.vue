<script setup lang="ts">
import AdminItemDialog from "./adminItemDialog.vue";
import { useCounterStore } from "../../../stores/counter";
import { ref, watch } from "vue";
import { supabase } from "@/lib/supabaseClient";
import AdminItemTable from "./adminItemTable.vue";
const store = useCounterStore();

const inputData = ref("");

const searchTickets = async () => {
  try {
    store.itemsIsLoading = true;

    const { data } = await supabase
      .from("items-table")
      .select()
      .ilike("companyId", `%${inputData.value}%`)
      .range(
        (store.currentPage - 1) * store.itemsOnPage,
        store.currentPage * store.itemsOnPage - 1
      );

    if (data) {
      store.dataToShow = [...data];
    }
  } catch (error) {
    console.log(error);
  } finally {
    store.itemsIsLoading = false;
  }
};

watch(inputData, () => {
  store.fetchData();
});
</script>

<template>
  <div class="max-w-[1015px] basis-full m-auto gap-4 flex-between">
    <form class="flex-between w-full gap-1 m-auto">
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        class="w-full"
        v-model="inputData"
        @keydown.enter="searchTickets"
      />
      <Button type="submit" @click.prevent="searchTickets">Search</Button>
    </form>
    <AdminItemDialog />
  </div>
  <div v-if="store.itemsIsLoading">
    <StockLoader />
  </div>
  <div v-else>
    <AdminItemTable />
  </div>
</template>

<style scoped>
button:hover {
  .icon {
    background-color: var(--green-500);
    fill: var(--green-500);
  }
}
</style>
