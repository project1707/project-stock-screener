<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockTableContainer from "./StockTableContainer.vue";
import { useCounterStore } from "@/stores/counter";
import { onMounted } from "vue";
import { supabase } from "../../../lib/supabaseClient";

const store = useCounterStore();

const sortNumbers = (key: string, order: "asc" | "desc") => {
  store.dataToShow.sort((a, b) => {
    const aKey = a[key as keyof typeof a] as unknown as number;
    const bKey = b[key as keyof typeof b] as unknown as number;
    return order === "asc" ? aKey - bKey : bKey - aKey;
  });
};

onMounted(() => {
  sortNumbers("EMADiff_FinalScore", "desc");
});
</script>

<template>
  <section class="mt-4">
    <div class="w-full">
      <Tabs default-value="ema-diff" class="w-full flex justify-between gap-3">
        <TabsList
          class="flex flex-col gap-3 max-w-[350px] basis-full h-[140px] p-4"
        >
          <TabsTrigger
            value="ema-diff"
            class="w-full"
            @click="sortNumbers('EMADiff_FinalScore', 'desc')"
          >
            EMA Diff
          </TabsTrigger>
          <TabsTrigger
            value="super-trend"
            class="w-full"
            @click="sortNumbers('SuperTrend_FinalScore', 'desc')"
          >
            SuperTrend
          </TabsTrigger>
          <TabsTrigger
            value="squeeze"
            class="w-full"
            @click="sortNumbers('SqueezeMomentum_FinalScore', 'desc')"
          >
            Squeeze momentum
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ema-diff" class="w-full">
          <StockTableContainer />
        </TabsContent>
        <TabsContent value="super-trend" class="w-full">
          <StockTableContainer />
        </TabsContent>
        <TabsContent value="squeeze" class="w-full">
          <StockTableContainer />
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>

<style>
td {
  text-align: center;
  padding: 8px;
}
</style>
