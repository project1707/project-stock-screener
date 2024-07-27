<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCounterStore } from "@/stores/counter";
import StockBurgerMenu from "./StockBurgerMenu.vue";
import { ref } from "vue";
import { LogOut } from "lucide-vue-next";
import { supabase } from "@/lib/supabaseClient";
import router from "@/router";

const store = useCounterStore();

const inputData = ref("");

const searchTickets = async () => {
  if (inputData.value.length !== 0) {
    const { data, error } = await supabase
      .from("items-table")
      .select()
      .textSearch("companyId", inputData.value);
    if (inputData.value.length === 0 || inputData.value === "") {
      store.fetchData();
    }
    if (error) {
      console.log(`Error with serching items: ${error}`);
    } else {
      store.dataToShow = data;
    }
  }
};

const signOut = async () => {
  await supabase.auth.signOut();

  store.isConfirmed = false;
  store.userName = "";

  router.go(0);
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
        <Button type="submit" @click.prevent="searchTickets">Search</Button>
      </form>
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
      <div v-else>
        <DropdownMenu>
          <DropdownMenuTrigger class="flex-between gap-3">
            <h5>
              Hi, <span class="font-bold">{{ store.userName }}</span
              >!
            </h5>
            <div
              class="w-[40px] h-[40px] rounded-full p-2 border-[2px] cursor-pointer"
            >
              <img src="/src/assets/img/user-logo.svg" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="z-[300]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button class="w-full mt-1 flex-between gap-3" @click="signOut"
              >Logout <LogOut
            /></Button>
          </DropdownMenuContent>
        </DropdownMenu>
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
