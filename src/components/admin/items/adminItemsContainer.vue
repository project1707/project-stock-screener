<script setup lang="ts">
import AdminItemDialog from "./adminItemDialog.vue";
import { useCounterStore } from "../../../stores/counter";
import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import AdminItemTable from "./adminItemTable.vue";
const store = useCounterStore();

const inputData = ref("");

const searchTickets = async () => {
  if (inputData.value.length !== 0) {
    const { data, error } = await supabase
      .from("items-table")
      .select()
      .textSearch("companyId", inputData.value);
    if (inputData.value.length === 0) {
      store.fetchData();
    }
    if (error) {
      console.log(`Error with serching items: ${error}`);
    } else {
      store.dataToShow = data;
    }
  }
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
