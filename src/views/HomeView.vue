<script setup lang="ts"></script>

<template>
  <div class="min-h-screen flex flex-col">
    <StockHeader />
    <main class="flex-auto">
      <StockItemTable />
    </main>
    <StockFooter />
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
</style>
