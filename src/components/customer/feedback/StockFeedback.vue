<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";
import StockStar from "./StockStar.vue";
import { watch } from "vue";

const store = useCounterStore();

const commentText = ref("");
const commentRating = ref(0);
const activateButton = ref(false);
const showFeeback = ref(true);

watch([commentRating, commentText], () => {
  if (commentRating.value !== 0 && commentText.value.length !== 0) {
    activateButton.value = true;
  } else {
    activateButton.value = false;
  }
});

const getRating = (rating: number) => {
  commentRating.value = rating;

  console.log(commentRating.value);
};

const sendComments = async () => {
  const { data, error } = await supabase
    .from("user-feedback")
    .insert([
      {
        userName: store.userName,
        text: commentText.value,
        rating: commentRating.value,
      },
    ])
    .select();

  if (error) {
    console.log(error);
  } else {
    console.log(data);

    showFeeback.value = false;
  }
};
</script>

<template>
  <div v-if="store.role !== 'admin' && showFeeback">
    <Dialog>
      <DialogTrigger class="w-full flex items-center justify-center">
        <Button class="mt-5"> Share your feedback </Button>
      </DialogTrigger>
      <DialogContent class="z-[300]">
        <DialogHeader>
          <DialogTitle class="text-2xl">Share your feedback:</DialogTitle>
          <DialogDescription>
            <form class="mt-4">
              <Textarea
                placeholder="tell us about your experience..."
                v-model="commentText"
                required
              />
              <h3 class="text-lg mt-4 font-bold text-black">
                Rate our application:
              </h3>
              <StockStar @sendStar="getRating" />
              <DialogClose as-child>
                <Button
                  type="submit"
                  class="mt-4 w-full"
                  @click.prevent="sendComments"
                  :disabled="!activateButton"
                  >Submit</Button
                >
              </DialogClose>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</template>
