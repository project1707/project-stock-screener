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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";
import { ref, watch } from "vue";

type UserMetadata = {
  name: string;
  phone: string;
  password: string;
  role: string;
};

type Item = {
  id: string | undefined;
  email: string;
  password: string;
  user_metadata: UserMetadata;
};

const emit = defineEmits(["getUsers"]);

const props = defineProps<{
  el: Item;
}>();

const el = props.el;
const initialEl = ref({ ...props.el });
const isModified = ref(false);

watch(el, (newVal) => {
  isModified.value = JSON.stringify(newVal) !== JSON.stringify(initialEl.value);
});

const editItem = async () => {
  if (isModified.value && el.id) {
    const { data: user, error } = await supabase.auth.admin.updateUserById(
      el.id,
      {
        email: el.email,
        password: el.user_metadata.password,
        user_metadata: {
          name: el.user_metadata.name,
          phone: el.user_metadata.phone,
          password: el.user_metadata.password,
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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent class="z-[400]">
              <SelectItem value="customer"> customer </SelectItem>
              <SelectItem value="admin"> admin </SelectItem>
            </SelectContent>
          </Select>
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
              class="w-full"
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
