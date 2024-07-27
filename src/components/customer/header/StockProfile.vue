<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCounterStore } from "@/stores/counter";
import { LogOut } from "lucide-vue-next";
import { supabase } from "@/lib/supabaseClient";
const store = useCounterStore();
import router from "@/router";

const signOut = async () => {
  await supabase.auth.signOut();

  store.isConfirmed = false;
  store.userName = "";

  router.go(0);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex-between gap-3 w-full">
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
</template>
