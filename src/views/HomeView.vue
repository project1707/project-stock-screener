<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { onMounted, ref } from "vue";
import { watch } from "vue";

const store = useCounterStore();

const isLoading = ref(true);

onMounted(() => {
  store.fetchData();
});

watch(store, () => {
  if (store.itemsIsLoading === false) {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <StockHeader />
    <main class="flex-auto">
      <div v-if="isLoading">
        <StockLoader />
      </div>
      <div v-else>
        <StockItemTable />
      </div>
    </main>
    <StockFooter />
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
</style>
