import {
  SpecialPrize,
  TSpecialPrizeOptions,
} from "@/game/core/game-objects/special-prize";
import { Shape } from "@/game/core/consts/shape";
import { Scores } from "@/game/core/consts/scores";

const options: TSpecialPrizeOptions = {
  size: 10,
  boundaryPoint: [600, 600],
  color: "red",
  unavailablePositions: [],
};

afterEach(() => {
  jest.useRealTimers();
});

describe("SpecialPrize", () => {
  it("should be the NormalPrize instance", () => {
    const specialPrize = new SpecialPrize(options);

    expect(specialPrize).toBeInstanceOf(SpecialPrize);
  });

  it("should properly calculate color when initialized", () => {
    const specialPrize = new SpecialPrize(options);

    expect(specialPrize.color).toEqual("red");
  });

  it("should properly calculate shape when initialized", () => {
    const specialPrize = new SpecialPrize(options);

    expect(specialPrize.shape).toEqual(Shape.Arc);
  });

  it("should properly calculate scores when initialized", () => {
    const specialPrize = new SpecialPrize(options);

    expect(specialPrize.scores).toEqual(Scores.SpecialPrize);
  });

  it("should properly calculate isAvailable when initialized", () => {
    const specialPrize = new SpecialPrize(options);

    expect(specialPrize.isAvailable).toBeTruthy();
  });

  it("should properly calculate isAvailable after timer fired", () => {
    jest.useFakeTimers();
    const specialPrize = new SpecialPrize(options);
    jest.advanceTimersByTime(specialPrize.lifeTime);

    expect(specialPrize.isAvailable).toBeFalsy();
  });
});
