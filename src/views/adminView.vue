<script setup lang="ts">
import AdminItemsContainer from "@/components/admin/items/adminItemsContainer.vue";
import adminUsersContainer from "@/components/admin/users/adminUsersContainer.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold">Admin panel:</h1>
    <Tabs
      default-value="items"
      class="max-w-[1015px] basis-full flex flex-col items-center justify-between mt-4"
    >
      <TabsList class="m-auto w-full">
        <TabsTrigger value="items" class="w-full"> Items </TabsTrigger>
        <TabsTrigger value="users" class="w-full"> Users </TabsTrigger>
      </TabsList>
      <TabsContent value="items" class="h-[520px]">
        <AdminItemsContainer />
      </TabsContent>
      <TabsContent value="users" class="w-full h-[520px]"
        ><adminUsersContainer
      /></TabsContent>
    </Tabs>
  </section>
</template>
