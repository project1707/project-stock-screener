<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        <router-link :to="{ name: 'signin' }">
          <DropdownMenuItem class="text-lg">Sign in</DropdownMenuItem>
        </router-link>
        <router-link :to="{ name: 'signup' }">
          <DropdownMenuItem class="text-lg">Sign up</DropdownMenuItem>
        </router-link>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
