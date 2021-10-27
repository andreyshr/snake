import { Ref, ref } from "vue";
import { Position } from "@/game";

type TReturnUseUserLevel = {
  userLevel: Ref<Position[]>;
  setUserLevel(level: Position[]): void;
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

  const setUserLevel = (level: Position[]) => {
    localStorage.setItem(userLevelKey, JSON.stringify(level));
  };

  userLevel.value = getUserLevel();

  return { userLevel, setUserLevel };
};
