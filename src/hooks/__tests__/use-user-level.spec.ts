import { LocalStorageMock } from "@/mocks/local-storage-mock";
import { useUserLevel, userLevelKey } from "@/hooks/use-user-level";

describe("useUserLevel", () => {
  Object.defineProperty(window, "localStorage", {
    value: new LocalStorageMock(),
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return properly value if value is correctly JSON", () => {
    localStorage.setItem(userLevelKey, JSON.stringify([[10, 10]]));
    const { userLevel } = useUserLevel();

    expect(userLevel.value).toEqual([[10, 10]]);
  });

  it("should return properly value if key is not exist", () => {
    const { userLevel } = useUserLevel();

    expect(userLevel.value).toEqual([]);
  });

  it("should return properly value if value is not correctly JSON", () => {
    localStorage.setItem(userLevelKey, "10,10[20,20]");
    const { userLevel } = useUserLevel();

    expect(userLevel.value).toEqual([]);
  });

  it("should save value", () => {
    jest.spyOn(localStorage, "setItem");
    const { setUserLevel } = useUserLevel();

    setUserLevel([[10, 10]]);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      userLevelKey,
      "[[10,10]]"
    );
  });

  it("should return properly value if value is updated", () => {
    localStorage.setItem(userLevelKey, JSON.stringify([[10, 10]]));
    const { userLevel, setUserLevel } = useUserLevel();

    expect(userLevel.value).toEqual([[10, 10]]);

    setUserLevel([[20, 20]]);

    expect(userLevel.value).toEqual([[20, 20]]);
  });
});
