<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCounterStore } from "@/stores/counter";
import StockPagination from "@/components/ui/myPagination/StockPagination.vue";

const store = useCounterStore();

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
            @click="
              store.sortNumbers('EMADiff_FinalScore', 'desc');
              store.currentFilter = 'EMADiff_FinalScore';
            "
          >
            EMA Diff
          </TabsTrigger>
          <TabsTrigger
            value="super-trend"
            class="w-full"
            @click="
              store.sortNumbers('superTrend_FinalScore', 'desc');
              store.currentFilter = 'superTrend_FinalScore';
            "
          >
            SuperTrend
          </TabsTrigger>
          <TabsTrigger
            value="squeeze"
            class="w-full"
            @click="
              store.sortNumbers(
                'squeezeMomentum_LinearRegressionValueDelta',
                'desc'
              );
              store.currentFilter =
                'squeezeMomentum_LinearRegressionValueDelta';
            "
          >
            Squeeze momentum
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ema-diff" class="w-full">
          <ScrollArea
            class="h-[437px] basis-full max-w-[964px] min-w-[818px] overflow-hIDden border rounded-xl"
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
                <tr v-for="ticket in store.dataToShow" :key="ticket.ID">
                  <td class="duration-300 border-b">{{ ticket?.ID }}</td>
                  <td class="duration-300 border-b">
                    {{ ticket?.companyId }}
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
            class="rounded-xl h-[437px] basis-full max-w-[964px] border min-w-[818px] overflow-hIDden"
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
                    {{ ticket?.superTrend_FinalScore }}
                  </td>
                </tr>
              </tbody>
            </table>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="squeeze" class="w-full">
          <ScrollArea
            class="rounded-xl h-[437px] basis-full border max-w-[964px] min-w-[818px] overflow-hIDden"
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
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <StockPagination />
    </div>
  </section>
</template>

<style>
td {
  text-align: center;
  padding: 8px;
}
</style>
