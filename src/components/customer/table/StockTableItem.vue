<script setup lang="ts">
defineProps({
  ticket: Object,
});
</script>

<template>
  <tr>
    <td class="duration-300 border-b">{{ ticket?.Company_Ticker }}</td>
    <td class="duration-300 border-b">{{ ticket?.Company_Name }}</td>
    <td class="duration-300 border-b">{{ ticket?.["Lot Size"] }}</td>
    <td class="duration-300 border-b">{{ ticket?.LTP }}</td>
    <td class="duration-300 border-b">{{ ticket?.EMA_Last_Month }}</td>
    <td class="duration-300 border-b">{{ ticket?.EMA_Last_Year }}</td>
    <td class="duration-300 border-b">
      {{ ticket?.EMA_Diff_Last_Month_Last_Year }}
    </td>
  </tr>
</template>
