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

type Item = {
  ID: number | null;
  companyId: string;
  lotSize: number | null;
  LTP: number | null;
  EMADiff: number | null;
  EMADiff_FinalScore: number | null;
  superTrend_Hide: number | null;
  superTrend: number | null;
  superTrend_DownScore_Hide: number | null;
  superTrend_FinalScore: number | null;
  squeezeMomentum_SqueezeOn_Hide: string;
  squeezeMomentum_Hide: string;
  squeezeMomentum: string;
  squeezeMomentum_LinearRegressionValueDelta: number | null;
  squeezeMomentum_FinalScore: number | null;
};

const props = defineProps<{
  el: Item;
}>();

const el = props.el;
const initialEl = ref({ ...props.el });
const isModified = ref(false);

watch(
  el,
  (newVal) => {
    isModified.value =
      JSON.stringify(newVal) !== JSON.stringify(initialEl.value);
  },
  { deep: true }
);

const editItem = async () => {
  if (isModified.value) {
    const { data, error } = await supabase
      .from("items-table")
      .update({
        companyId: el.companyId,
        lotSize: el.lotSize,
        LTP: el.LTP,
        EMADiff: el.EMADiff,
        EMADiff_FinalScore: el.EMADiff_FinalScore,
        superTrend_Hide: el.superTrend_Hide,
        superTrend: el.superTrend,
        superTrend_DownScore_Hide: el.superTrend_DownScore_Hide,
        superTrend_FinalScore: el.superTrend_FinalScore,
        squeezeMomentum_SqueezeOn_Hide: el.squeezeMomentum_SqueezeOn_Hide,
        squeezeMomentum_Hide: el.squeezeMomentum_Hide,
        squeezeMomentum: el.squeezeMomentum,
        squeezeMomentum_LinearRegressionValueDelta:
          el.squeezeMomentum_LinearRegressionValueDelta,
        squeezeMomentum_FinalScore: el.squeezeMomentum_FinalScore,
      })
      .eq("ID", el.ID);
    if (error) {
      console.log(`Error: problems with editing items: ${error}`);
    } else {
      console.log(data);

      store.fetchData();
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
        <ScrollArea class="h-[400px]">
          <form>
            <Input
              type="text"
              placeholder="Company Name (Always Show)"
              v-model="el.companyId"
            />
            <Input
              type="number"
              placeholder="Lot Size (Always Show)"
              v-model="el.lotSize"
            />
            <Input
              type="number"
              placeholder=" Last Traded Price (Always Show)"
              v-model="el.LTP"
            />
            <Input
              type="number"
              placeholder="EMA Diff | ema_1mo-1yr (Show)"
              v-model="el.EMADiff"
            />
            <Input
              type="number"
              placeholder="EMA Diff | ema_1mo-1yr % LTP (Show, Rank)"
              v-model="el.EMADiff_FinalScore"
            />
            <Input
              type="number"
              placeholder="SuperTrend | Trend (Hide)"
              v-model="el.superTrend_Hide"
            />
            <Input
              type="number"
              placeholder="SuperTrend | Up Score (Show)"
              v-model="el.superTrend"
            />
            <Input
              type="number"
              placeholder="SuperTrend | Down Score (Hide)"
              v-model="el.superTrend_DownScore_Hide"
            />
            <Input
              type="number"
              placeholder="SuperTrend | Final Score (Show, Rank)"
              v-model="el.superTrend_FinalScore"
            />
            <Input
              type="text"
              placeholder="Squeeze Momentum | Squeeze On (Hide)"
              v-model="el.squeezeMomentum_SqueezeOn_Hide"
            />
            <Input
              type="text"
              placeholder="Squeeze Momentum | Trend (Hide)"
              v-model="el.squeezeMomentum_Hide"
            />
            <Input
              type="text"
              placeholder="Squeeze Momentum | Signal (Show)"
              v-model="el.squeezeMomentum"
            />
            <Input
              type="number"
              placeholder="Squeeze Momentum | Linear Regression Value Delta (Show)"
              v-model="el.squeezeMomentum_LinearRegressionValueDelta"
            />
            <Input
              type="number"
              placeholder="Squeeze Momentum | Final Score (Hide, Rank)"
              v-model="el.squeezeMomentum_FinalScore"
            />
          </form>
        </ScrollArea>

        <div class="mt-4 w-full flex-between gap-3">
          <DialogClose as-child>
            <Button variant="outline" class="w-full">Close</Button>
          </DialogClose>
          <DialogClose as-child>
            <Button
              class="w-full"
              :disabled="!isModified"
              @click.prevent="editItem"
              >Edit stem</Button
            >
          </DialogClose>
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>
