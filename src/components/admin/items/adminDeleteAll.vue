<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "../../ui/dialog";

import { supabase } from "@/lib/supabaseClient";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();

const deleteItem = async () => {
  store.itemsIsLoading = true;
  try {
    const { error } = await supabase
      .from("items-table")
      .delete()
      .not("ID", "is", null);
    if (error) {
      console.log(`error with deleting: ${error}`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    store.itemsIsLoading = false;
    store.fetchLength();
    store.fetchData();
  }
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <button
        class="bg-red-500 text-[14px] max-w-[150px] basis-full text-light px-4 py-2 rounded-lg border hover:text-red-500 border-red-500 hover:bg-light duration-300"
      >
        Delete all items
      </button>
    </DialogTrigger>
    <DialogContent class="z-[300]">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">Delete all items:</DialogTitle>
        <DialogDescription>
          <div class="w-full">
            <h3 class="text-xl text-center">Delete all items?</h3>
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
