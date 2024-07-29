<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();

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
        password: password.value,
        role: "customer",
      },
    },
  });

  if (error) {
    console.log(`Error with sign up: ${error}`);
  } else {
    console.log(data.user);

    store.isConfirmed = true;
    store.userName = data.user?.user_metadata.name;
    store.user = data.user;
    store.role = data.user?.app_metadata.role;

    console.log(data.user?.user_metadata.name);
  }
};
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center">
    <form
      class="p-4 bg-light rounded-lg border text-center w-[60vw] tablets:w-[90vw] m-auto"
    >
      <div v-if="!store.isConfirmed">
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
          <p class="my-4">or</p>
          <router-link :to="{ name: 'signin' }">
            <Button variant="link" class="text-lg text-primary">
              Sign in
            </Button>
          </router-link>
        </label>
      </div>
      <div v-else class="text-center flex flex-col items-center gap-3">
        <h2 class="text-3xl font-bold">Confirm your sign up</h2>

        <p>Please check your email to confirm your account.</p>
      </div>
    </form>
  </section>
</template>
