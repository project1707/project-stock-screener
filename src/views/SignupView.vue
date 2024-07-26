<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  console.log(data.user);

  if (error) {
    console.log(`Error with sign up: ${error}`);
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
      <a
        href="#"
        class="text-sm text-primary font-light block mt-5 p-2 rounded-lg hover:bg-primary/45 w-fit m-auto duration-300"
        >Forgot the password?
      </a>
      <h3 class="text-xl font-medium mt-4">or</h3>
      <div class="mt-4">
        <button
          class="w-full border-black border-2 px-5 py-2 text-center duration-300 hover:bg-black/25"
        >
          <p>Sign up with Google</p>
        </button>
      </div>
    </form>
  </section>
</template>
