<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold">Admin panel:</h1>
    <Tabs
      default-value="items"
      class="max-w-[1015px] flex flex-col items-center justify-between mt-4"
    >
      <TabsList class="m-auto">
        <TabsTrigger value="items"> Items </TabsTrigger>
        <TabsTrigger value="users"> Users </TabsTrigger>
      </TabsList>
      <TabsContent value="items">
        <StockTable />
      </TabsContent>
      <TabsContent value="users"> </TabsContent>
    </Tabs>
  </section>
</template>
