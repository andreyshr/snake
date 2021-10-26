import {
  Obstruction,
  TObstructionOptions,
} from "@/game/core/game-objects/obstruction";
import { Shape } from "@/game/core/consts/shape";

const options: TObstructionOptions = {
  coordinates: [
    [10, 10],
    [20, 20],
  ],
  size: 10,
  boundaryPoint: [600, 600],
  color: "red",
};

let obstruction: Obstruction;

beforeEach(() => {
  obstruction = new Obstruction(options);
});

describe("Obstruction", () => {
  it("should be the Obstruction instance", () => {
    expect(obstruction).toBeInstanceOf(Obstruction);
  });

  it("should properly calculate coordinates when initialized", () => {
    expect(obstruction.coordinates).toEqual([
      [10, 10],
      [20, 20],
    ]);
  });

  it("should properly calculate color when initialized", () => {
    expect(obstruction.color).toEqual("red");
  });

  it("should properly calculate shape when initialized", () => {
    expect(obstruction.shape).toEqual(Shape.Square);
  });
});
