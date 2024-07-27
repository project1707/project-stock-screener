import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

export const useCounterStore = defineStore("counter", () => {
  const data = ref<any[]>([]);

  const users = ref<any[]>([]);

  const dataToShow = ref([...data.value]);

  const sortNumbers = (key: string, order: "asc" | "desc") => {
    dataToShow.value = [...data.value];

    dataToShow.value.sort((a, b) => {
      const aKey = Number(a[key as keyof typeof a]);
      const bKey = Number(b[key as keyof typeof b]);

      if (isNaN(aKey) || isNaN(bKey)) {
        throw new Error(
          `The key "${key}" must correspond to numerical values in the objects.`
        );
      }

      return order === "asc" ? aKey - bKey : bKey - aKey;
    });
  };

  const currentFilter = ref("EMADiff_FinalScore");

  const isConfirmed = ref(false);
  const userName = ref<string | undefined>("");

  function createNickname() {
    userName.value = userName.value?.split("@")[0];
  }

  // pagination logic
  const itemsOnPage = 25;
  const currentPage = ref(1);
  const itemsLength = ref();

  const fetchLength = async () => {
    const { data, error } = await supabase.from("items-table").select("*");

    itemsLength.value = data?.length;

    if (error) {
      console.log(`error with fetching items length: ${error}`);
    }
  };

  onMounted(() => {
    fetchLength();
  });

  const fetchData = async () => {
    const { data: FechedData, error } = await supabase
      .from("items-table")
      .select("*")
      .range(
        (currentPage.value - 1) * itemsOnPage,
        currentPage.value * itemsOnPage - 1
      );

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      data.value = FechedData;
      dataToShow.value = data.value;

      if (currentFilter.value === "EMADiff_FinalScore") {
        sortNumbers("EMADiff_FinalScore", "desc");
      }
      if (currentFilter.value === "superTrend_FinalScore") {
        sortNumbers("superTrend_FinalScore", "desc");
      }
      if (
        currentFilter.value === "squeezeMomentum_LinearRegressionValueDelta"
      ) {
        sortNumbers("squeezeMomentum_LinearRegressionValueDelta", "desc");
      }

      console.log(data);
    }
  };

  return {
    data,
    dataToShow,
    users,
    sortNumbers,
    currentFilter,
    userName,
    isConfirmed,
    createNickname,
    fetchData,
  };
});
