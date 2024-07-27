<script setup lang="ts">
import { computed, watch, ref, onMounted } from "vue";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { useCounterStore } from "@/stores/counter";
import { supabase } from "@/lib/supabaseClient";

const store = useCounterStore();

const emits = defineEmits(["sendArr"]);

// pagination logic
const itemsOnPage = 25;
const currentPage = ref(1);
const itemsLength = ref();

const fetchLength = async () => {
  const { data, error } = await supabase.from("items-table").select("*");

  itemsLength.value = data?.length;

  if (error) {
    console.log(`error with fetching items length: ${error}`);
  }
};

onMounted(() => {
  fetchLength();
});

const amountOnPage = computed(() => {
  return Math.ceil(itemsLength.value / itemsOnPage);
});

const fetchData = async () => {
  const { data, error } = await supabase
    .from("items-table")
    .select("*")
    .range(
      (currentPage.value - 1) * itemsOnPage,
      currentPage.value * itemsOnPage - 1
    );

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    store.data = data;
    store.dataToShow = store.data;

    if (store.currentFilter === "EMADiff_FinalScore") {
      store.sortNumbers("EMADiff_FinalScore", "desc");
    }
    if (store.currentFilter === "superTrend_FinalScore") {
      store.sortNumbers("superTrend_FinalScore", "desc");
    }
    if (store.currentFilter === "squeezeMomentum_LinearRegressionValueDelta") {
      store.sortNumbers("squeezeMomentum_LinearRegressionValueDelta", "desc");
    }

    console.log(data);
  }
};

onMounted(() => {
  setTimeout(() => {
    fetchData();
  }, 1000);
});

watch(currentPage, () => {
  fetchData();
});
</script>

<template>
  <template v-if="amountOnPage > 1">
    <Pagination
      v-slot="{ page }"
      :total="amountOnPage * 10"
      :sibling-count="1"
      show-edges
      :default-page="1"
      class="w-full flex items-center justify-center mt-10"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="currentPage = 1" />
        <PaginationPrev @click="currentPage--" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0 text-dark tablets:w-8 tablets:h-8"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="currentPage = item.value"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="currentPage++" />
        <PaginationLast @click="currentPage = amountOnPage" />
      </PaginationList>
    </Pagination>
  </template>
</template>
