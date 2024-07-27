<script setup lang="ts">
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

const store = useCounterStore();
</script>

<template>
  <template v-if="store.amountOnPage > 1">
    <Pagination
      v-slot="{ page }"
      :total="store.amountOnPage * 10"
      :sibling-count="1"
      show-edges
      :default-page="1"
      class="w-full flex items-center justify-center mt-10"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="store.currentPage = 1" />
        <PaginationPrev @click="store.currentPage--" />

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
              @click="store.currentPage = item.value"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="store.currentPage++" />
        <PaginationLast @click="store.currentPage = store.amountOnPage" />
      </PaginationList>
    </Pagination>
  </template>
</template>
