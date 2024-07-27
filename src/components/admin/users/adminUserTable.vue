<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import { useCounterStore } from "@/stores/counter";
import { onMounted } from "vue";

const store = useCounterStore();

async function getUsers() {
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  console.log("Registered users:", data);
}

getUsers();

onMounted(() => {
  getUsers();
});
</script>

<template>
  <ScrollArea
    class="h-[449px] w-full mt-4 min-w-[818px] overflow-hidden border rounded-xl"
  >
    <table class="w-full sticky z-[200] bg-light p-4">
      <thead class="sticky top-0 z-[200] bg-light rounded-t-xl">
        <tr>
          <th class="bg-light">
            <p class="border border-gray-200">Nickname</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">E-mail</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Password</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in store.users" :key="ticket.email">
          <td class="duration-300 border-b">{{ ticket?.nickname }}</td>
          <td class="duration-300 border-b">
            {{ ticket?.email }}
          </td>
          <td class="duration-300 border-b">{{ ticket?.password }}</td>
        </tr>
      </tbody>
    </table>
  </ScrollArea>
</template>
