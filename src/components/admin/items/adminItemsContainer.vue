<script setup lang="ts">
import AdminItemDialog from "./adminItemDialog.vue";
import { useCounterStore } from "../../../stores/counter";
import { ref, watch } from "vue";
import { supabase } from "@/lib/supabaseClient";
import AdminItemTable from "./adminItemTable.vue";
import AdminDeleteAll from "./adminDeleteAll.vue";
const store = useCounterStore();

const inputData = ref("");

const searchTickets = async () => {
  try {
    store.itemsIsLoading = true;

    const { data } = await supabase
      .from("items-table")
      .select()
      .ilike("companyId", `%${inputData.value}%`)
      .order(store.currentFilter, { ascending: false })
      .range(
        (store.currentPage - 1) * store.itemsOnPage,
        store.currentPage * store.itemsOnPage - 1
      );

    const { data: dataLength } = await supabase
      .from("items-table")
      .select()
      .ilike("companyId", `%${inputData.value}%`);

    if (data) {
      store.itemsLength = dataLength?.length;

      store.dataToShow = [...data];

      console.log(store.itemsLength, store.amountOnPage);
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
        @input.prevent="searchTickets"
        @keydown.enter.prevent="searchTickets"
      />
      <Button type="submit" @click.prevent="searchTickets">Search</Button>
    </form>
    <AdminItemDialog />
    <AdminDeleteAll />
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
