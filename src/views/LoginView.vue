<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import router from "@/router";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";

const store = useCounterStore();

const email = ref("");
const password = ref("");

const signIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.error("Error signing in:", error.message);
  } else {
    console.log("Signed in user:", data.user);

    store.userName = data.user.email;
    store.isConfirmed = true;
    store.createNickname();

    router.push({ name: "home" });
  }
};
</script>

<template>
  <router-link :to="{ name: 'home' }">
    <p class="text-primary font-light ml-4 mt-4 block">Return to "Home" page</p>
  </router-link>
  <section class="min-h-screen flex flex-col items-center justify-center">
    <form class="p-4 bg-light rounded-lg border text-center w-[60vw] m-auto">
      <h1 class="text-3xl font-bold">Sign in</h1>
      <label class="flex flex-col items-center gap-2 mt-4">
        <Input
          type="search"
          placeholder="Email..."
          class="w-full"
          v-model="email"
          required
        />
        <Input
          type="password"
          placeholder="Password..."
          class="w-full"
          v-model="password"
          required
        />
        <Button class="w-full" @click.prevent="signIn">Sign in</Button>
      </label>
    </form>
  </section>
</template>
