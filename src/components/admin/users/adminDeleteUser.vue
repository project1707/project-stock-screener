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

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["getUsers"]);

const deleteUser = async () => {
  const { data, error } = await supabase.auth.admin.deleteUser(props.id);
  if (error) {
    console.log(`error with deleting: ${error}`);
  } else {
    console.log(data);

    emit("getUsers");
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
        <DialogTitle class="text-2xl font-bold">Delete user:</DialogTitle>
        <DialogDescription>
          <div class="w-full">
            <h3 class="text-xl text-center">Delete this user?</h3>
            <div class="w-full flex-between gap-3 mt-4">
              <DialogClose as-child>
                <Button variant="outline" class="w-full">Cencel</Button>
              </DialogClose>
              <DialogClose as-child>
                <Button variant="destructive" class="w-full" @click="deleteUser"
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
