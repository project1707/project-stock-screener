<script setup lang="ts"></script>

<template>
  <router-link :to="{ name: 'home' }">
    <p class="text-primary font-light ml-4 mt-4 block">Return to "Home" page</p>
  </router-link>
  <section class="min-h-screen flex flex-col items-center justify-center">
    <form class="p-4 bg-light rounded-lg border text-center w-[60vw] m-auto">
      <h1 class="text-3xl font-bold">Sign in</h1>
      <label class="flex flex-col items-center gap-2 mt-4">
        <Input type="search" placeholder="Email..." class="w-full" required />
        <Input
          type="password"
          placeholder="Password..."
          class="w-full"
          required
        />
        <Button class="w-full">Sign in</Button>
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
          <p>Sign in with Google</p>
        </button>
      </div>
    </form>
  </section>
</template>
