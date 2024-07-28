<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button> Share your feedback </Button>
    </DialogTrigger>
    <DialogContent class="z-[300]">
      <DialogHeader>
        <DialogTitle class="text-2xl">Share your feedback:</DialogTitle>
        <DialogDescription>
          <form class="mt-4">
            <label class="flex-between gap-3 mt-2">
              <Textarea placeholder="tell us about your experience..." />
            </label>
            <DialogClose as-child>
              <Button type="submit" class="mt-4 w-full">Submit</Button>
            </DialogClose>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
