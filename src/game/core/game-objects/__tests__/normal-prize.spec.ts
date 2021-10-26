import {
  NormalPrize,
  TNormalPrizeOptions,
} from "@/game/core/game-objects/normal-prize";
import { Shape } from "@/game/core/consts/shape";
import { Scores } from "@/game/core/consts/scores";

const options: TNormalPrizeOptions = {
  size: 10,
  boundaryPoint: [600, 600],
  color: "red",
  unavailablePositions: [],
};

let normalPrize: NormalPrize;

beforeEach(() => {
  normalPrize = new NormalPrize(options);
});

describe("NormalPrize", () => {
  it("should be the NormalPrize instance", () => {
    expect(normalPrize).toBeInstanceOf(NormalPrize);
  });

  it("should properly calculate color when initialized", () => {
    expect(normalPrize.color).toEqual("red");
  });

  it("should properly calculate shape when initialized", () => {
    expect(normalPrize.shape).toEqual(Shape.Square);
  });

  it("should properly calculate scores when initialized", () => {
    expect(normalPrize.scores).toEqual(Scores.NormalPrize);
  });
});
