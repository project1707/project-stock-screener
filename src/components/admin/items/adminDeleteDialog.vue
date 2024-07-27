<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "../../ui/dialog";
import { CircleX } from "lucide-vue-next";

import { supabase } from "@/lib/supabaseClient";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();

const props = defineProps({
  id: Number,
});

const deleteItem = async () => {
  const { error } = await supabase
    .from("items-table")
    .delete()
    .eq("ID", props.id);
  if (error) {
    console.log(`error with deleting: ${error}`);
  } else {
    store.fetchData();
  }
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <button class="p-3 bg-red-500 rounded-lg btn-delete">
        <CircleX color="#ffffff" class="" />
      </button>
    </DialogTrigger>
    <DialogContent class="z-[300]">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">Delete item:</DialogTitle>
        <DialogDescription>
          <div class="w-full">
            <h3 class="text-xl text-center">Delete this item?</h3>
            <div class="w-full flex-between gap-3 mt-4">
              <DialogClose as-child>
                <Button variant="outline" class="w-full">Cencel</Button>
              </DialogClose>
              <DialogClose as-child>
                <Button variant="destructive" class="w-full" @click="deleteItem"
                  >Delete</Button
                >
              </DialogClose>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
