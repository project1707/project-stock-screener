<script setup lang="ts">
import { onMounted, watch } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { ref } from "vue";
import AdminFeedbackTable from "./adminFeedbackTable.vue";

interface Comment {
  id: number;
  created_at: string;
  userName: string;
  text: string;
  rating: number;
}

const inputData = ref("");
const comments = ref<Comment[]>([]);
const feedbackIsLoading = ref(true);

const getComments = async () => {
  try {
    let { data: userFeedback } = await supabase
      .from("user-feedback")
      .select("*");

    if (userFeedback) {
      comments.value = userFeedback;
    }

    console.log(comments.value);
  } catch (error) {
    console.log(error);
  } finally {
    feedbackIsLoading.value = false;
  }
};

const searchComments = async () => {
  if (inputData.value.length !== 0) {
    const { data, error } = await supabase
      .from("user-feedback")
      .select()
      .ilike("userName", `%${inputData.value}%`);

    if (error) {
      console.log(`Error with serching items: ${error}`);
    } else {
      comments.value = data;
    }
  }
};

watch(inputData, () => {
  if (inputData.value.length === 0) {
    getComments();
  }
});

onMounted(() => {
  getComments();
});
</script>

<template>
  <div class="max-w-[1015px] basis-full m-auto gap-4 flex-between">
    <form class="flex-between basis-full gap-1 m-auto">
      <Input
        id="search"
        type="search"
        v-model="inputData"
        @keydown.enter="getComments"
        placeholder="Search..."
        class="w-full"
      />
      <Button type="submit" @click.prevent="searchComments">Search</Button>
    </form>
  </div>
  <div v-if="feedbackIsLoading">
    <StockLoader />
  </div>
  <div v-else>
    <AdminFeedbackTable @getFeedback="getComments" :arr="comments" />
  </div>
</template>
