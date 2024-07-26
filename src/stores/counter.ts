import { ref } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const data = ref<any[]>([]);

  const users = [
    {
      nickname: "johndoe",
      email: "johndoe@gmail.com",
      password: "Passw0rd123!",
    },
    { nickname: "janedoe", email: "janedoe@yahoo.com", password: "Jane2023#" },
    {
      nickname: "mike123",
      email: "mike123@outlook.com",
      password: "Mik3sStr0ngP@ss",
    },
    {
      nickname: "sarah_smith",
      email: "sarah_smith@hotmail.com",
      password: "S@rah!678",
    },
    {
      nickname: "peterpan",
      email: "peterpan@gmail.com",
      password: "FlyHigh2022!",
    },
    {
      nickname: "alice_w",
      email: "alice_w@icloud.com",
      password: "WonderL@nd!89",
    },
    {
      nickname: "robert_b",
      email: "robert_b@live.com",
      password: "RobbieSecure#456",
    },
    { nickname: "emily.j", email: "emily.j@gmail.com", password: "Em1lyJ0y!" },
    {
      nickname: "charlie_d",
      email: "charlie_d@yahoo.com",
      password: "Ch@rlie789",
    },
    {
      nickname: "lucas_m",
      email: "lucas_m@hotmail.com",
      password: "LucasPass2023#",
    },
    {
      nickname: "olivia_p",
      email: "olivia_p@outlook.com",
      password: "Olivia1234!",
    },
    {
      nickname: "daniel_t",
      email: "daniel_t@gmail.com",
      password: "D@nie!234",
    },
    { nickname: "megan_h", email: "megan_h@yahoo.com", password: "M3g@nH!567" },
    {
      nickname: "steven_k",
      email: "steven_k@hotmail.com",
      password: "St3ven@K789",
    },
    {
      nickname: "natalie_b",
      email: "natalie_b@live.com",
      password: "Nat@l!e2022",
    },
    {
      nickname: "james_w",
      email: "james_w@icloud.com",
      password: "Jam3sW!678",
    },
    { nickname: "laura_c", email: "laura_c@gmail.com", password: "L@uraC123" },
    { nickname: "brian_r", email: "brian_r@yahoo.com", password: "Bri@nR!789" },
    { nickname: "amy_t", email: "amy_t@hotmail.com", password: "AmyT2023#" },
    {
      nickname: "kevin_m",
      email: "kevin_m@outlook.com",
      password: "Kev1nM!456",
    },
    {
      nickname: "rachel_s",
      email: "rachel_s@gmail.com",
      password: "R@chelS!890",
    },
    { nickname: "david_j", email: "david_j@yahoo.com", password: "Dav1dJ#123" },
    {
      nickname: "linda_k",
      email: "linda_k@hotmail.com",
      password: "L!ndaK2022",
    },
    { nickname: "eric_l", email: "eric_l@live.com", password: "Er!cL789" },
    {
      nickname: "kelly_f",
      email: "kelly_f@icloud.com",
      password: "K3llyF#234",
    },
  ];

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
  return { data, dataToShow, users, sortNumbers, currentFilter };
});
