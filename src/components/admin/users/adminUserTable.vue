<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import adminDeleteUser from "./adminDeleteUser.vue";
import AdminEditUser from "./adminEditUser.vue";

const store = useCounterStore();

const emit = defineEmits(["getUsers"]);

const getUsers = () => {
  emit("getUsers");
};
</script>

<template>
  <ScrollArea
    class="h-[449px] w-full mt-4 min-w-[818px] overflow-hidden border rounded-xl"
  >
    <table class="w-full sticky z-[200] bg-light p-4">
      <thead class="sticky top-0 z-[200] bg-light rounded-t-xl">
        <tr>
          <th class="bg-light">
            <p class="border border-gray-200">Role</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Name</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">E-mail</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Phone</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Password</p>
          </th>
          <th class="bg-light">
            <p class="border border-gray-200">Functions</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in store.usersToShow" :key="ticket.email">
          <td class="duration-300 border-b overflow-x-auto">
            {{ ticket?.user_metadata.role }}
          </td>
          <td class="duration-300 border-b">
            {{ ticket?.user_metadata.name }}
          </td>
          <td class="duration-300 border-b">
            {{ ticket?.email }}
          </td>
          <td class="duration-300 border-b">
            {{ ticket?.user_metadata.phone }}
          </td>
          <td class="duration-300 border-b">
            {{ ticket?.user_metadata.password }}
          </td>
          <td class="border-b">
            <div class="flex-between gap-1 max-w-[100px] m-auto">
              <AdminEditUser :el="ticket" @getUsers="getUsers" />
              <adminDeleteUser :id="ticket.id" @getUsers="getUsers" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ScrollArea>
</template>
