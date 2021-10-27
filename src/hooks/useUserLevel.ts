import { Ref, ref } from "vue";
import { TPosition } from "@/game";

type TReturnUseUserLevel = {
  userLevel: Ref<TPosition[]>;
  setUserLevel(level: TPosition[]): void;
};

const userLevelKey = "snake_user_level";

export const useUserLevel = (): TReturnUseUserLevel => {
  const userLevel = ref();

  const getUserLevel = () => {
    try {
      return JSON.parse(localStorage.getItem(userLevelKey) || "[]");
    } catch {
      return [];
    }
  };

  const setUserLevel = (level: TPosition[]) => {
    localStorage.setItem(userLevelKey, JSON.stringify(level));
  };

  userLevel.value = getUserLevel();

  return { userLevel, setUserLevel };
};
