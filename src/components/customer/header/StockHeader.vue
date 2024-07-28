<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import StockBurgerMenu from "./StockBurgerMenu.vue";
import StockAdminLink from "./StockAdminLink.vue";

const store = useCounterStore();
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

      <StockBurgerMenu />
      <div v-if="!store.isConfirmed" class="flex-between tablets:hidden gap-3">
        <router-link :to="{ name: 'signin' }">
          <Button variant="outline">Sign in</Button>
        </router-link>
        <p>or</p>

        <router-link :to="{ name: 'signup' }">
          <Button>Sign up</Button>
        </router-link>
      </div>
      <div v-if="store.isConfirmed" class="flex-between gap-3 tablets:hidden">
        <div v-if="store.isConfirmed">
          <StockProfile />
        </div>
        <StockAdminLink />
      </div>
    </div>
  </header>
</template>
