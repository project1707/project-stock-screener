<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";
import adminUserTable from "./adminUserTable.vue";
const store = useCounterStore();

const inputData = ref("");

const searchUsers = () => {
  store.users = store.users.filter((el: { nickname: string }) => {
    return el.nickname.toUpperCase().includes(inputData.value.toUpperCase());
  });

  console.log(store.users);
};

import { SquarePlus } from "lucide-vue-next";
</script>

<template>
  <div class="max-w-[1015px] basis-full m-auto gap-4 flex-between">
    <form class="flex-between basis-full gap-1 m-auto">
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        class="w-full"
        v-model="inputData"
        @input.prevent="searchUsers"
      />
      <Button type="submit" @click.prevent="searchUsers">Search</Button>
    </form>
    <button
      class="bg-green-500 h text-light px-4 py-2 rounded-lg flex-between gap-3 border hover:text-green-500 border-green-500 hover:bg-light duration-300"
    >
      <p class="text-[14px] w-[85px]">Add new item</p>
      <SquarePlus color="#ffffff" class="w-7 h-7 icon" />
    </button>
  </div>
  <adminUserTable />
</template>
