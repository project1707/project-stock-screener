<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { ref, onMounted } from "vue";
import adminUserTable from "./adminUserTable.vue";
import { supabase } from "@/lib/supabaseClient";
import AdminCreateUser from "./adminCreateUser.vue";
const store = useCounterStore();

const inputData = ref("");

const searchUsers = () => {
  store.usersToShow = store.usersToShow.filter(
    (el: { user_metadata: { name: string } }) => {
      return el.user_metadata.name
        .toUpperCase()
        .includes(inputData.value.toUpperCase());
    }
  );

  if (inputData.value.length === 0 || inputData.value === " ") {
    store.usersToShow = [...store.users];
  }

  console.log(store.users);
};

const getUsers = async () => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error("Error fetching users:", error);
    } else {
      console.log("Registered users:", data.users);
      store.users = [...data.users];
      store.usersToShow = [...store.users];
    }
  } catch (error) {
    console.log(error);
  } finally {
    store.usersIsLoading = false;
  }
};

onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="w-full basis-full m-auto gap-4 flex-between">
    <form class="flex-between basis-full gap-1 m-auto">
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        class="w-full"
        v-model="inputData"
        @input.prevent="searchUsers"
      />
      <Button type="submit" @click.prevent="searchUsers">Search</Button>
    </form>
    <AdminCreateUser @getUsers="getUsers" />
  </div>
  <div v-if="store.usersIsLoading">
    <StockLoader />
  </div>
  <div v-else>
    <adminUserTable @getUsers="getUsers" />
  </div>
</template>
