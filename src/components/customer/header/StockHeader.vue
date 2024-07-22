<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";

const store = useCounterStore();

const inputData = ref("");

const searchTickets = () => {
  store.dataToShow = store.data.filter((el: { Company_Name: string }) => {
    return el.Company_Name.toUpperCase().includes(
      inputData.value.toUpperCase()
    );
  });

  console.log(store.dataToShow);
};
</script>

<template>
  <header class="w-full p-4 shadow-md sticky top-0 z-[200] bg-light">
    <div class="container flex-between gap-3">
      <div class="flex-between max-w-fit gap-2">
        <h1 class="text-2xl font-medium uppercase text-primary">Brand</h1>
        <div class="overflow-hidden w-10 h-10">
          <img src="/src/assets/img/logo.svg" class="w-full" />
        </div>
      </div>
      <form class="flex max-w-[700px] basis-full items-center gap-1.5">
        <Input
          id="search"
          type="search"
          placeholder="Search..."
          class="w-full"
          v-model="inputData"
          @input.prevent="searchTickets"
        />
        {{ inputData }}
        <Button type="submit" @click.prevent="searchTickets">Search</Button>
      </form>
      <div class="flex-between gap-3">
        <Button variant="outline">Sign in</Button>
        <p>or</p>
        <Button>Sign up</Button>
      </div>
    </div>
  </header>
</template>
