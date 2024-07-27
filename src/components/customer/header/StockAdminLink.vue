<script setup lang="ts">
import { Settings } from "lucide-vue-next";

import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
</script>

<template>
  <div v-if="store.role === 'admin'">
    <router-link :to="{ name: 'admin' }">
      <button class="flex flex-col items-center text-sm">
        <Settings />
      </button>
    </router-link>
  </div>
</template>
