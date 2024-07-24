<script setup lang="ts">
defineProps({
  ticket: Object,
});
</script>

<template>
  <tr>
    <td class="duration-300 border-b">{{ ticket?.id }}</td>
    <td class="duration-300 border-b">{{ ticket?.companyName }}</td>
    <td class="duration-300 border-b">{{ ticket?.lotSize }}</td>
    <td class="duration-300 border-b">{{ ticket?.LTP }}</td>
    <td class="duration-300 border-b">{{ ticket?.EMADiff }}</td>
    <td class="duration-300 border-b">{{ ticket?.EMADiff_FinalScore }}</td>
    <td class="duration-300 border-b">
      {{ ticket?.EMA_Diff_Last_Month_Last_Year }}
    </td>
  </tr>
</template>
