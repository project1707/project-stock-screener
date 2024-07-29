import { ref, computed, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

export const useCounterStore = defineStore("counter", () => {
  const data = ref<any[]>([]);
  const users = ref<any[]>([]);
  const comments = ref<any[] | null>([]);

  const dataToShow = ref([...data.value]);
  const usersToShow = ref<any[] | null>([]);

  const currentFilter = ref("EMADiff_FinalScore");

  const itemsIsLoading = ref(true);
  const usersIsLoading = ref(true);
  const isConfirmed = ref(false);
  const userName = ref<string | undefined>("");
  const user = ref<any>({});
  const role = ref("");

  if (localStorage.getItem("user")) {
    user.value = JSON.parse(localStorage.getItem("user")!);
  } else localStorage.setItem("user", JSON.stringify(user.value));

  if (localStorage.getItem("isConfirmed")) {
    isConfirmed.value = JSON.parse(localStorage.getItem("isConfirmed")!);
  } else localStorage.setItem("isConfirmed", JSON.stringify(isConfirmed.value));

  if (localStorage.getItem("userName")) {
    userName.value = localStorage.getItem("userName") as string;
  } else
    localStorage.setItem(
      "userName",
      userName.value !== undefined ? userName.value : ""
    );

  if (localStorage.getItem("role")) {
    role.value = localStorage.getItem("role") as string;
  } else
    localStorage.setItem("role", role.value !== undefined ? role.value : "");

  watch(isConfirmed, (newValue) => {
    localStorage.setItem("isConfirmed", JSON.stringify(newValue));
  });

  watch(userName, (newValue) => {
    localStorage.setItem("userName", newValue !== undefined ? newValue : "");
  });

  watch(user, (newValue) => {
    localStorage.setItem("user", JSON.stringify(newValue));
  });

  watch(role, (newValue) => {
    localStorage.setItem("role", newValue);
  });

  // pagination logic
  const itemsOnPage = 50;
  const currentPage = ref(1);
  const itemsLength = ref();

  const fetchLength = async () => {
    let { data: itemsTable, error } = await supabase
      .from("items-table")
      .select("*");

    itemsLength.value = itemsTable?.length;

    console.log(itemsLength.value);

    if (error) {
      console.log(`error with fetching items length: ${error}`);
    }
  };

  onMounted(() => {
    fetchLength();
  });

  const amountOnPage = computed(() => {
    return Math.ceil(itemsLength.value / itemsOnPage);
  });

  const fetchData = async () => {
    console.log(amountOnPage.value);

    try {
      const { data: FetchedData, error } = await supabase
        .from("items-table")
        .select("*")
        .order(currentFilter.value, { ascending: false })
        .range(
          (currentPage.value - 1) * itemsOnPage,
          currentPage.value * itemsOnPage - 1
        );

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        data.value = [...FetchedData];
        dataToShow.value = [...data.value];

        console.log(data);
        itemsIsLoading.value = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      itemsIsLoading.value = false;
      console.log("aaa");
    }
  };

  watch(currentPage, () => {
    fetchData();
  });

  return {
    data,
    dataToShow,
    users,
    currentFilter,
    userName,
    isConfirmed,
    fetchData,
    itemsIsLoading,
    user,
    currentPage,
    amountOnPage,
    role,
    usersIsLoading,
    usersToShow,
    comments,
    itemsOnPage,
  };
});
