<script setup lang="ts">
import AdminFeedbackContainer from "@/components/admin/feedback/adminFeedbackContainer.vue";
import AdminItemsContainer from "@/components/admin/items/adminItemsContainer.vue";
import adminUsersContainer from "@/components/admin/users/adminUserContainer.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import router from "@/router";

import { useCounterStore } from "@/stores/counter";
import { onMounted } from "vue";
const store = useCounterStore();

onMounted(() => {
  if (store.role === "customer") {
    router.push({ name: "home" });
  }
  if (store.role !== "admin" && store.role !== "customer") {
    router.push({ name: "signin" });
  }

  store.fetchData();
});
</script>

<template>
  <router-link :to="{ name: 'home' }">
    <p class="text-primary text-lg m-4">Return to "Home" page</p>
  </router-link>
  <section class="min-h-screen">
    <Tabs
      default-value="items"
      class="max-w-[1015px] basis-full flex flex-col items-center justify-between mt-4 m-auto"
    >
      <TabsList class="m-auto w-full">
        <TabsTrigger value="items" class="w-full"> Items </TabsTrigger>
        <TabsTrigger value="users" class="w-full"> Users </TabsTrigger>
        <TabsTrigger value="feedback" class="w-full"> Feedback </TabsTrigger>
      </TabsList>
      <TabsContent value="items" class="h-[520px]">
        <AdminItemsContainer />
      </TabsContent>
      <TabsContent value="users" class="w-full h-[520px]"
        ><adminUsersContainer
      /></TabsContent>
      <TabsContent value="feedback" class="w-full h-[520px]"
        ><AdminFeedbackContainer
      /></TabsContent>
    </Tabs>
  </section>
</template>
