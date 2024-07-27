<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const name = ref("");
const phone = ref("");

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value,
        phone: phone.value,
      },
    },
  });

  if (error) {
    console.log(`Error with sign up: ${error}`);
  } else {
    console.log(data.user);
  }
};
</script>

<template>
  <router-link :to="{ name: 'home' }">
    <p class="text-primary font-light ml-4 mt-4 block">Return to "Home" page</p>
  </router-link>
  <section class="min-h-screen flex flex-col items-center justify-center">
    <form class="p-4 bg-light rounded-lg border text-center w-[60vw] m-auto">
      <h1 class="text-3xl font-bold">Sign up</h1>
      <label class="flex flex-col items-center gap-2 mt-4">
        <label class="flex-between gap-2 w-full">
          <Input
            type="text"
            placeholder="Name..."
            v-model="name"
            class="w-full"
            required
          />
          <Input
            type="tel"
            placeholder="Phone..."
            v-model="phone"
            class="w-full"
            required
          />
        </label>
        <Input
          type="search"
          placeholder="Email..."
          v-model="email"
          class="w-full"
          required
        />
        <Input
          type="password"
          placeholder="Password..."
          class="w-full"
          v-model="password"
          required
        />
        <Button class="w-full" @click.prevent="signUp">Sign up</Button>
      </label>
    </form>
  </section>
</template>
