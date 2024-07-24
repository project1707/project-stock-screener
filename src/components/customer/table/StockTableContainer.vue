<script setup lang="ts">
import { ScrollBar } from "@/components/ui/scroll-area";

import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
</script>

<template>
  <ScrollArea class="h-[449px] min-w-[818px] overflow-hidden">
    <table class="w-full sticky z-[200] bg-light">
      <thead class="sticky top-0 z-[200] bg-light">
        <tr>
          <th class="bg-light">
            <p class="border border-gray-200">ID</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Company name</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Lot size</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">LTP</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Up score</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Final score</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <StockTableItem
          v-for="ticket in store.dataToShow"
          :key="ticket"
          :ticket="ticket"
        />
      </tbody>
    </table>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>
