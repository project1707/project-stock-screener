<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import StockBurgerMenu from "./StockBurgerMenu.vue";
import { ref } from "vue";

const store = useCounterStore();

const inputData = ref("");

const searchTickets = () => {
  store.dataToShow = store.data.filter((el: { companyName: string }) => {
    return el.companyName.toUpperCase().includes(inputData.value.toUpperCase());
  });

  console.log(store.dataToShow);
};
</script>

<template>
  <header class="w-full p-4 shadow-md sticky top-0 z-[200] bg-light">
    <div class="container flex-between gap-5">
      <div class="flex-between max-w-fit gap-2">
        <h1 class="text-2xl phonel:text-xl font-medium uppercase text-primary">
          Brand
        </h1>
        <div class="overflow-hidden w-10 h-10 phonel:w-5 phonel:h-5">
          <img src="/src/assets/img/logo.svg" class="w-full" />
        </div>
      </div>
      <form
        class="flex max-w-[700px] basis-full items-center tablet:hidden gap-1.5"
      >
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
      <StockBurgerMenu />
      <div class="flex-between tablets:hidden gap-3">
        <router-link :to="{ name: 'signin' }">
          <Button variant="outline">Sign in</Button>
        </router-link>
        <p>or</p>

        <router-link :to="{ name: 'signup' }">
          <Button>Sign up</Button>
        </router-link>
      </div>
    </div>
    <form
      class="hidden tablet:flex container basis-full items-center mt-5 gap-1.5"
    >
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
  </header>
</template>
