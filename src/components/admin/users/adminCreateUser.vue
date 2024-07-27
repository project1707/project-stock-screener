<script setup lang="ts">
import { FilePenLine } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { ref, watch } from "vue";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();

type UserMetadata = {
  name: string;
  phone: string;
  password: string;
};

type Item = {
  id: string | undefined;
  email: string;
  password: string;
  user_metadata: UserMetadata;
};

const props = defineProps<{
  el: Item;
}>();

const emit = defineEmits(["getUsers"]);

const el = ref({ ...props.el });
const initialEl = ref({ ...props.el });
const isModified = ref(false);

watch(
  el,
  (newVal, oldVal) => {
    isModified.value =
      JSON.stringify(newVal) !== JSON.stringify(initialEl.value);
  },
  { deep: true }
);

const editItem = async () => {
  if (el.value.id) {
    const { data: user, error } = await supabase.auth.admin.updateUserById(
      el.value.id,
      {
        email: el.value.email,
        password: el.value.user_metadata.password,
        user_metadata: {
          name: el.value.user_metadata.name,
          phone: el.value.user_metadata.phone,
          password: el.value.user_metadata.password,
        },
      }
    );
    if (error) {
      console.log(`Error: problems with editing items: ${error}`);
    } else {
      console.log(user);
      emit("getUsers");
    }
  }
};
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <button class="p-3 bg-blue-500 rounded-lg btn-edit">
        <FilePenLine color="#ffffff" class="" />
      </button>
    </DialogTrigger>
    <DialogContent class="z-[300]">
      <DialogHeader>
        <DialogTitle class="text-2xl">Edit item:</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <form>
          <Input
            type="text"
            placeholder="Name"
            v-model="el.user_metadata.name"
          />
          <Input type="email" placeholder="Email" v-model="el.email" />
          <Input
            type="tel"
            placeholder="Phone"
            v-model="el.user_metadata.phone"
          />
          <Input
            type="text"
            placeholder="Password"
            v-model="el.user_metadata.password"
          />
        </form>
        <div class="mt-4 w-full flex-between gap-3">
          <DialogClose as-child>
            <Button variant="outline" class="w-full">Close</Button>
          </DialogClose>
          <DialogClose as-child>
            <Button
              class="w-full bg-green border-green"
              @click.prevent="editItem"
              :disabled="!isModified"
              >Edit user</Button
            >
          </DialogClose>
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>
