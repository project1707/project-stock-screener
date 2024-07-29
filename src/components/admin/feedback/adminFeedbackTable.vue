<script setup lang="ts">
import AdminDeleteFeedback from "./adminDeleteFeedback.vue";

interface Comment {
  id: number;
  created_at: string;
  userName: string;
  text: string;
  rating: number;
}

defineProps<{
  arr: Comment[];
}>();

const emit = defineEmits(["getFeedback"]);

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const getFeedback = () => {
  emit("getFeedback");
};
</script>

<template>
  <section class="mt-4">
    <ScrollArea
      class="rounded-xl h-[437px] basis-full w-full border min-w-[818px] overflow-hIDden"
    >
      <table class="w-full sticky z-[200] bg-light">
        <thead class="sticky top-0 z-[200] bg-light rounded-t-xl">
          <tr>
            <th class="bg-light">
              <p class="border border-gray-200">Time</p>
            </th>
            <th class="bg-light">
              <p class="border border-gray-200">User name</p>
            </th>
            <th class="bg-light">
              <p class="border border-gray-200">Comment</p>
            </th>
            <th class="bg-light">
              <p class="border border-gray-200">Rating</p>
            </th>
            <th class="bg-light">
              <p class="border border-gray-200">Functions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in arr" :key="comment?.id">
            <td class="border-b">
              {{ formatDate(comment?.created_at) }}
            </td>
            <td class="border-b">{{ comment?.userName }}</td>
            <td class="border-b max-w-[150px] break-words">
              {{ comment?.text }}
            </td>
            <td class="border-b">
              {{ comment?.rating }}
            </td>
            <td class="border-b">
              <AdminDeleteFeedback
                @getFeedback="getFeedback"
                :id="comment?.id"
                class="m-auto"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </ScrollArea>
  </section>
</template>
