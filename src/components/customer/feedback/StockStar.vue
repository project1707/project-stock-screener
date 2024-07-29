<script setup lang="ts">
import { ref, watch } from "vue";
import { Star } from "lucide-vue-next";

const emit = defineEmits(["sendStar"]);

const commentRating = ref(0);

watch(commentRating, () => {
  console.log(commentRating.value);

  emit("sendStar", commentRating.value);
});
</script>

<template>
  <div v-if="commentRating === 1" class="flex-between gap-3 max-w-fit">
    <Star color="#ffff00" fill="#ffff00" @click="commentRating = 1" />
    <Star @click="commentRating = 2" />
    <Star @click="commentRating = 3" />
    <Star @click="commentRating = 4" />
    <Star @click="commentRating = 5" />
  </div>
  <div v-if="commentRating === 2" class="flex-between gap-3 max-w-fit">
    <Star color="#ffff00" fill="#ffff00" @click="commentRating = 1" />
    <Star color="#ffff00" fill="#ffff00" @click="commentRating = 2" />
    <Star @click="commentRating = 3" />
    <Star @click="commentRating = 4" />
    <Star @click="commentRating = 5" />
  </div>
  <div v-if="commentRating === 3" class="flex-between gap-3 max-w-fit">
    <Star color="#ffff00" fill="#ffff00" @click="commentRating = 1" />
    <Star @click="commentRating = 2" color="#ffff00" fill="#ffff00" />
    <Star @click="commentRating = 3" color="#ffff00" fill="#ffff00" />
    <Star @click="commentRating = 4" />
    <Star @click="commentRating = 5" />
  </div>
  <div v-if="commentRating === 4" class="flex-between gap-3 max-w-fit">
    <Star color="#ffff00" fill="#ffff00" @click="commentRating = 1" />
    <Star color="#ffff00" fill="#ffff00" @click="commentRating = 2" />
    <Star color="#ffff00" fill="#ffff00" @click="commentRating = 3" />
    <Star color="#ffff00" fill="#ffff00" @click="commentRating = 4" />
    <Star @click="commentRating = 5" />
  </div>
  <div v-if="commentRating === 5" class="flex-between gap-3 max-w-fit">
    <Star
      v-for="(star, id) in 5"
      :key="star"
      color="#ffff00"
      fill="#ffff00"
      @click="commentRating = id + 1"
    />
  </div>
  <div v-if="commentRating === 0" class="flex-between gap-3 max-w-fit">
    <Star v-for="(star, id) in 5" :key="star" @click="commentRating = id + 1" />
  </div>
</template>
