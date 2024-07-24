<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockTableContainer from "./StockTableContainer.vue";
import { useCounterStore } from "@/stores/counter";
import { onMounted } from "vue";
import { supabase } from "../../../lib/supabaseClient";

const store = useCounterStore();

const sortNumbers = (key: string, order: "asc" | "desc") => {
  // Create a copy of the original array to avoid mutating it directly
  store.dataToShow = [...store.data];

  store.dataToShow.sort((a, b) => {
    // Ensure that the values to be compared are numbers
    const aKey = Number(a[key as keyof typeof a]);
    const bKey = Number(b[key as keyof typeof b]);

    // If the conversion to number fails, handle it gracefully (optional)
    if (isNaN(aKey) || isNaN(bKey)) {
      throw new Error(
        `The key "${key}" must correspond to numerical values in the objects.`
      );
    }

    // Perform the comparison based on the order parameter
    return order === "asc" ? aKey - bKey : bKey - aKey;
  });
};

onMounted(() => {
  sortNumbers("EMADiff_FinalScore", "desc");
});

console.log(store.dataToShow);
</script>

<template>
  <section class="mt-4">
    <div class="w-full container">
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
          <ScrollArea
            class="h-[449px] basis-full max-w-[964px] min-w-[818px] overflow-hidden border rounded-xl"
          >
            <table class="w-full sticky z-[200] bg-light p-4">
              <thead class="sticky top-0 z-[200] bg-light rounded-t-xl">
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
                    <p class="border border-gray-200">Ema_1mo-1yr</p>
                  </th>
                  <th class="bg-light">
                    <p class="border border-gray-200">ema_1mo-1yr%LTP</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ticket in store.dataToShow" :key="ticket.id">
                  <td class="duration-300 border-b">{{ ticket?.id }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.companyName }}
                  </td>
                  <td class="duration-300 border-b">{{ ticket?.lotSize }}</td>
                  <td class="duration-300 border-b">{{ ticket?.LTP }}</td>
                  <td class="duration-300 border-b">{{ ticket?.EMADiff }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.EMADiff_FinalScore }}
                  </td>
                </tr>
              </tbody>
            </table>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="super-trend" class="w-full">
          <ScrollArea
            class="rounded-xl h-[449px] basis-full max-w-[964px] border min-w-[818px] overflow-hidden"
          >
            <table class="w-full sticky z-[200] bg-light">
              <thead class="sticky top-0 z-[200] bg-light rounded-t-xl">
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
                <tr v-for="ticket in store.dataToShow" :key="ticket.id">
                  <td class="duration-300 border-b">{{ ticket?.id }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.companyName }}
                  </td>
                  <td class="duration-300 border-b">{{ ticket?.lotSize }}</td>
                  <td class="duration-300 border-b">{{ ticket?.LTP }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.SuperTrend }}
                  </td>
                  <td class="duration-300 border-b">
                    {{ ticket?.SuperTrend_FinalScore }}
                  </td>
                </tr>
              </tbody>
            </table>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="squeeze" class="w-full">
          <ScrollArea
            class="rounded-xl h-[449px] basis-full border max-w-[964px] min-w-[818px] overflow-hidden"
          >
            <table class="w-full sticky z-[200] bg-light">
              <thead class="sticky top-0 z-[200] bg-light rounded-t-xl">
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
                    <p class="border border-gray-200">Signal</p>
                  </th>
                  <th class="bg-light">
                    <p class="border border-gray-200">
                      Linear Regression Value Delta
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ticket in store.dataToShow" :key="ticket.id">
                  <td class="duration-300 border-b">{{ ticket?.id }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.companyName }}
                  </td>
                  <td class="duration-300 border-b">{{ ticket?.lotSize }}</td>
                  <td class="duration-300 border-b">{{ ticket?.LTP }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.SqueezeMomentum }}
                  </td>
                  <td class="duration-300 border-b">
                    {{ ticket?.SqueezeMomentum_FinalScore }}
                  </td>
                </tr>
              </tbody>
            </table>
          </ScrollArea>
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
