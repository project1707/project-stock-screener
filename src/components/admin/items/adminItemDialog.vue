<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePlus } from "lucide-vue-next";
import { ref } from "vue";
import Papa from "papaparse";
import type { ParseResult } from "papaparse";
import { supabase } from "@/lib/supabaseClient";

const CSVData = ref<File | null>(null);
const jsonData = ref<any[]>([]);

const handleFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    CSVData.value = target.files[0];

    console.log(CSVData.value);
  }
};

const uploadItems = async () => {
  jsonData.value.forEach(async (el: string[]) => {
    const { data, error } = await supabase
      .from("items-table")
      .insert([
        {
          ID: Number(el[0]),
          companyId: el[1],
          lotSize: Number(el[2]),
          LTP: Number(el[3]),
          EMADiff: Number(el[4]),
          EMADiff_FinalScore: Number(el[5].slice(0, el[5].length - 1)),
          superTrend_Hide: Number(el[6]),
          superTrend: Number(el[7]),
          superTrend_DownScore_Hide: Number(el[8]),
          superTrend_FinalScore: Number(el[9].slice(0, el[9].length - 1)),
          squeezeMomentum_SqueezeOn_Hide: el[10],
          squeezeMomentum_Hide: el[11],
          squeezeMomentum: el[12],
          squeezeMomentum_LinearRegressionValueDelta: Number(el[13]),
          squeezeMomentum_FinalScore: Number(
            el[14].slice(0, el[14].length - 1)
          ),
        },
      ])
      .select();

    console.log(data);

    if (error) {
      console.log(`Error with uploading data: ${error}`);
    }
  });
};

const parseFile = async (file: File | null) => {
  if (file) {
    Papa.parse(file, {
      complete: (results: ParseResult<any>) => {
        jsonData.value = results.data;
        console.log(results.data);
      },
    });

    console.log(jsonData.value);

    setTimeout(() => {
      jsonData.value = jsonData.value
        .map((row: string[]) =>
          row.filter((item: string) => item.trim().length > 0)
        )
        .filter((row: string[]) => row.length > 0);

      console.log(jsonData.value);
    }, 2000);

    setTimeout(() => {
      uploadItems();
    }, 3000);
  }
};
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <button
        class="bg-green-500 h text-light px-4 py-2 rounded-lg flex-between gap-3 border hover:text-green-500 border-green-500 hover:bg-light duration-300"
      >
        <p class="text-[14px] w-[85px]">Add new item</p>
        <SquarePlus color="#ffffff" class="w-7 h-7 icon" />
      </button>
    </DialogTrigger>
    <DialogContent class="z-[300]">
      <DialogHeader>
        <DialogTitle class="text-2xl">Add new items:</DialogTitle>
        <DialogDescription>
          <form class="mt-4" @submit.prevent="parseFile(CSVData)">
            <h2 class="text-xl text-black">Upload CSV file:</h2>
            <label class="flex-between gap-3 mt-2">
              <Input
                type="file"
                @change="handleFile"
                class="file-input"
                required
              />
              <Button type="submit">Submit</Button>
            </label>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
