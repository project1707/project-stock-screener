<script setup lang="ts">
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
import { ref } from "vue";

const emit = defineEmits(["getUsers"]);

const role = ref("");
const name = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value,
        phone: phone.value,
        password: password.value,
        role: role.value,
      },
    },
  });

  if (error) {
    console.log(`Error with sign up: ${error}`);
  } else {
    console.log(data.user);

    emit("getUsers");
  }
};
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <button
        class="bg-green-500 h text-light px-4 py-2 rounded-lg border hover:text-green-500 border-green-500 hover:bg-light duration-300"
      >
        <p class="text-[14px] w-[90px]">Add new user</p>
      </button>
    </DialogTrigger>
    <DialogContent class="z-[300]">
      <DialogHeader>
        <DialogTitle class="text-2xl">Create user:</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <form>
          <Input type="text" placeholder="Name" v-model="name" required />
          <Select v-model="role">
            <SelectTrigger>
              <SelectValue placeholder="Select a role" required />
            </SelectTrigger>
            <SelectContent class="z-[400]">
              <SelectItem value="customer"> customer </SelectItem>
              <SelectItem value="admin"> admin </SelectItem>
            </SelectContent>
          </Select>
          <Input type="email" placeholder="Email" v-model="email" required />
          <Input type="tel" placeholder="Phone" v-model="phone" required />
          <Input
            type="text"
            placeholder="Password"
            v-model="password"
            required
          />
          <div class="mt-4 w-full flex-between gap-3">
            <DialogClose as-child>
              <Button variant="outline" class="w-full">Close</Button>
            </DialogClose>
            <DialogClose as-child>
              <Button
                class="w-full bg-green-500 border-green"
                @click.submit.prevent="
                  signUp();
                  role = '';
                  name = '';
                  email = '';
                  phone = '';
                  password = '';
                "
                >Add new user</Button
              >
            </DialogClose>
          </div>
        </form>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>
