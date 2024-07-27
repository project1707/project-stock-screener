<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StockAdminLink from "./StockAdminLink.vue";

import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
</script>

<template>
  <div class="hidden tablets:block">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class="w-12 h-8 cursor-pointer">
          <span class="w-full h-1 bg-black block rounded-xl"></span>
          <span class="w-full h-1 bg-black block mt-2 rounded-xl"></span>
          <span class="w-full h-1 bg-black block mt-2 rounded-xl"></span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="z-[400]">
        <div v-if="!store.isConfirmed">
          <router-link :to="{ name: 'signin' }">
            <DropdownMenuItem class="text-lg">Sign in</DropdownMenuItem>
          </router-link>
          <router-link :to="{ name: 'signup' }">
            <DropdownMenuItem class="text-lg">Sign up</DropdownMenuItem>
          </router-link>
        </div>
        <div v-else class="text-lg hidden tablets:block">
          <StockProfile />
        </div>
        <div class="hidden tablets:flex items-center justify-center">
          <StockAdminLink />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
