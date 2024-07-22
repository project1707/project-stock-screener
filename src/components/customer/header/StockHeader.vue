<script setup lang="ts"></script>

<template>
  <section>
    <header class="w-full p-4 shadow-md">
      <div class="container flex-between">
        <div class="flex-between max-w-fit gap-2">
          <h1 class="text-2xl font-medium uppercase text-primary">Brand</h1>
          <div class="overflow-hidden w-10 h-10">
            <img src="/src/assets/img/logo.svg" class="w-full" />
          </div>
        </div>
        <form class="flex max-w-[700px] basis-full items-center gap-1.5">
          <Input
            id="search"
            type="search"
            placeholder="Search..."
            class="w-full"
          />
          <Button type="submit">Search</Button>
        </form>
        <div class="flex-between gap-3">
          <Button variant="outline">Sign in</Button>
          <p>or</p>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  </section>
</template>
