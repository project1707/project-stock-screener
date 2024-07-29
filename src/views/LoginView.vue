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

    store.userName = data.user.user_metadata.name;
    store.isConfirmed = true;
    store.user = data.user;
    store.role = data.user?.user_metadata.role;

    router.push({ name: "home" });

    store.fetchData();
  }
};
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center">
    <form
      class="p-4 bg-light rounded-lg border text-center w-[60vw] tablets:w-[90vw] m-auto"
    >
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
        <p class="my-4">or</p>
        <router-link :to="{ name: 'signup' }">
          <Button variant="link" class="text-lg text-primary">
            Create an account
          </Button>
        </router-link>
      </label>
    </form>
  </section>
</template>
