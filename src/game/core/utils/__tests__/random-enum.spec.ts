import { randomEnum } from "@/game/core/utils/random-enum";

enum TestEnum {
  A = "a",
  B = "b",
  C = "c",
}

jest.spyOn(Math, "random").mockImplementation(() => 0.5);

describe("randomEnum", () => {
  it("should return properly value without excluded values", () => {
    expect(randomEnum(TestEnum)).toEqual(TestEnum.B);
  });

  it("should return properly value with excluded values", () => {
    expect(randomEnum(TestEnum, [TestEnum.A, TestEnum.B])).toEqual(TestEnum.C);
  });
});
