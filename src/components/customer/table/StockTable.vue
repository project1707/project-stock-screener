<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const store = useCounterStore();

const sortStrings = (key: string, order: "asc" | "desc") => {
  store.dataToShow.sort((a, b) => {
    const aKey = a[key as keyof typeof a];
    const bKey = b[key as keyof typeof b];
    if (aKey < bKey) return order === "asc" ? -1 : 1;
    if (aKey > bKey) return order === "asc" ? 1 : -1;
    return 0;
  });
};

const sortNumbers = (key: string, order: "asc" | "desc") => {
  store.dataToShow.sort((a, b) => {
    const aKey = a[key as keyof typeof a] as number;
    const bKey = b[key as keyof typeof b] as number;
    return order === "asc" ? aKey - bKey : bKey - aKey;
  });
};

const resetData = () => {
  store.dataToShow = [...store.data];
};
</script>

<template>
  <section class="mt-4 min-w-[1060px] overflow-hidden">
    <div class="w-full">
      <ScrollArea class="w-full h-[449px]">
        <table class="w-full">
          <thead class="sticky top-0 z-[200] bg-light">
            <tr>
              <th
                class="z-[200] cursor-pointer hover:bg-gray-200 rounded-xl duration-300"
              >
                <DropdownMenu class="w-full">
                  <DropdownMenuTrigger
                    class="w-full bg-light border border-gray-200"
                    >Company Ticker</DropdownMenuTrigger
                  >
                  <DropdownMenuContent class="w-full">
                    <DropdownMenuItem @click="resetData"
                      >Default</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="sortStrings('Company_Ticker', 'asc')"
                      >By alphabet</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="sortStrings('Company_Ticker', 'desc')"
                      >By reversed alphabet</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </th>
              <th
                class="z-[200] cursor-pointer hover:bg-gray-200 rounded-xl duration-300"
              >
                <DropdownMenu class="w-full">
                  <DropdownMenuTrigger
                    class="w-full bg-light border border-gray-200"
                    >Company Name</DropdownMenuTrigger
                  >
                  <DropdownMenuContent class="w-full">
                    <DropdownMenuItem @click="resetData"
                      >Default</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="sortStrings('Company_Name', 'asc')"
                      >By alphabet</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="sortStrings('Company_Name', 'desc')"
                      >By reversed alphabet</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </th>
              <th
                class="z-[200] cursor-pointer hover:bg-gray-200 rounded-xl duration-300"
              >
                <DropdownMenu class="w-full">
                  <DropdownMenuTrigger
                    class="w-full bg-light border border-gray-200"
                    >Lot size</DropdownMenuTrigger
                  >
                  <DropdownMenuContent class="w-full">
                    <DropdownMenuItem @click="resetData"
                      >Default</DropdownMenuItem
                    >
                    <DropdownMenuItem @click="sortNumbers('Lot Size', 'asc')"
                      >By the smallest</DropdownMenuItem
                    >
                    <DropdownMenuItem @click="sortNumbers('Lot Size', 'desc')"
                      >By the biggest</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </th>
              <th
                class="z-[200] cursor-pointer hover:bg-gray-200 rounded-xl duration-300"
              >
                <DropdownMenu class="w-full">
                  <DropdownMenuTrigger
                    class="w-full bg-light border border-gray-200"
                    >LTP</DropdownMenuTrigger
                  >
                  <DropdownMenuContent class="w-full">
                    <DropdownMenuItem @click="resetData"
                      >Default</DropdownMenuItem
                    >
                    <DropdownMenuItem @click="sortNumbers('LTP', 'asc')"
                      >By the smallest</DropdownMenuItem
                    >
                    <DropdownMenuItem @click="sortNumbers('LTP', 'desc')"
                      >By the biggest</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </th>
              <th
                class="z-[200] cursor-pointer hover:bg-gray-200 rounded-xl duration-300"
              >
                <DropdownMenu class="w-full">
                  <DropdownMenuTrigger
                    class="w-full bg-light border border-gray-200"
                    >EMA Last Year</DropdownMenuTrigger
                  >
                  <DropdownMenuContent class="w-full">
                    <DropdownMenuItem @click="resetData"
                      >Default</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="sortNumbers('EMA_Last_Year', 'asc')"
                      >By the smallest</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="sortNumbers('EMA_Last_Year', 'desc')"
                      >By the biggest</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </th>
              <th
                class="z-[200] cursor-pointer hover:bg-gray-200 rounded-xl duration-300"
              >
                <DropdownMenu class="w-full">
                  <DropdownMenuTrigger
                    class="w-full bg-light border border-gray-200"
                    >EMA Last Month</DropdownMenuTrigger
                  >
                  <DropdownMenuContent class="w-full">
                    <DropdownMenuItem @click="resetData"
                      >Default</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="sortNumbers('EMA_Last_Month', 'asc')"
                      >By the smallest</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="sortNumbers('EMA_Last_Month', 'desc')"
                      >By the biggest</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </th>
              <th
                class="z-[200] cursor-pointer hover:bg-gray-200 rounded-xl duration-300"
              >
                <DropdownMenu class="w-full">
                  <DropdownMenuTrigger
                    class="w-full bg-light border border-gray-200"
                    >EMA Diff (Last Month - Last Year) %</DropdownMenuTrigger
                  >
                  <DropdownMenuContent class="w-full">
                    <DropdownMenuItem @click="resetData"
                      >Default</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="
                        sortNumbers('EMA_Diff_Last_Month_Last_Year', 'asc')
                      "
                      >By the smallest</DropdownMenuItem
                    >
                    <DropdownMenuItem
                      @click="
                        sortNumbers('EMA_Diff_Last_Month_Last_Year', 'desc')
                      "
                      >By the biggest</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
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
      </ScrollArea>
    </div>
  </section>
</template>

<style>
td {
  text-align: center;
  padding: 8px;
}
</style>
