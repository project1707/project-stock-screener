<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCounterStore } from "@/stores/counter";
import StockPagination from "@/components/ui/myPagination/StockPagination.vue";

const store = useCounterStore();

console.log(store.dataToShow);
</script>

<template>
  <section class="mt-4">
    <div class="w-full container relative">
      <Tabs
        default-value="ema-diff"
        class="w-full flex justify-between desktop:flex-col gap-3"
      >
        <TabsList
          class="flex flex-col gap-3 max-w-[350px] desktop:flex-row desktop:max-w-full basis-full h-[140px] p-4 phonel:h-[70px] phonel:p-2"
        >
          <TabsTrigger
            value="ema-diff"
            class="w-full phonel:text-[10px] phonel:w-fit"
            @click="
              store.currentFilter = 'EMADiff_FinalScore';
              store.fetchData();
            "
          >
            EMA Diff
          </TabsTrigger>
          <TabsTrigger
            value="super-trend"
            class="w-full phonel:text-[10px] phonel:w-fit"
            @click="
              store.currentFilter = 'superTrend_FinalScore';
              store.fetchData();
            "
          >
            SuperTrend
          </TabsTrigger>
          <TabsTrigger
            value="squeeze"
            class="w-full phonel:text-[10px] phonel:w-fit"
            @click="
              store.currentFilter =
                'squeezeMomentum_LinearRegressionValueDelta';
              store.fetchData();
            "
          >
            Squeeze momentum
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ema-diff" class="w-full">
          <div
            class="h-[437px] basis-full max-w-[964px] desktop:max-w-full overflow-y-auto border rounded-xl"
          >
            <table class="w-full min-w-[818px] bg-light p-4">
              <thead class="sticky top-0 z-[199] bg-light rounded-t-xl">
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
                <tr v-for="ticket in store.dataToShow" :key="ticket.ID">
                  <td class="duration-300 border-b">{{ ticket?.ID }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.companyId }}
                  </td>
                  <td class="duration-300 border-b">{{ ticket?.lotSize }}</td>
                  <td class="duration-300 border-b">{{ ticket?.LTP }}</td>
                  <td class="duration-300 border-b">{{ ticket?.EMADiff }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.EMADiff_FinalScore }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="super-trend" class="w-full">
          <div
            class="rounded-xl h-[437px] basis-full max-w-[964px] desktop:max-w-full border overflow-y-auto"
          >
            <table class="w-full bg-light min-w-[818px]">
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
                <tr v-for="ticket in store.dataToShow" :key="ticket.ID">
                  <td class="duration-300 border-b">{{ ticket?.ID }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.companyId }}
                  </td>
                  <td class="duration-300 border-b">{{ ticket?.lotSize }}</td>
                  <td class="duration-300 border-b">{{ ticket?.LTP }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.superTrend }}
                  </td>
                  <td class="duration-300 border-b">
                    {{ ticket?.superTrend_FinalScore }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="squeeze" class="w-full">
          <div
            class="rounded-xl h-[437px] basis-full border desktop:max-w-full max-w-[964px] overflow-y-auto"
          >
            <table class="w-full bg-light min-w-[818px]">
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
                <tr v-for="ticket in store.dataToShow" :key="ticket.ID">
                  <td class="duration-300 border-b">{{ ticket?.ID }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.companyId }}
                  </td>
                  <td class="duration-300 border-b">{{ ticket?.lotSize }}</td>
                  <td class="duration-300 border-b">{{ ticket?.LTP }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.squeezeMomentum }}
                  </td>
                  <td class="duration-300 border-b">
                    {{ ticket?.squeezeMomentum_LinearRegressionValueDelta }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      <StockPagination class="mt-5" />
      <StockFeedback />
    </div>
  </section>
</template>

<style>
td {
  text-align: center;
  padding: 8px;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
