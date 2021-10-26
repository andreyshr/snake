import { Snake, TSnakeOptions } from "@/game/core/game-objects/snake";
import { Direction } from "@/game/core/consts/direction";
import { Shape } from "@/game/core/consts/shape";

const options: TSnakeOptions = {
  initialLength: 3,
  size: 10,
  boundaryPoint: [600, 600],
  color: "red",
};

let snake: Snake;

beforeEach(() => {
  snake = new Snake(options);
});

describe("Snake", () => {
  it("should be the Snake instance", () => {
    expect(snake).toBeInstanceOf(Snake);
  });

  it("should properly calculate coordinates when initialized", () => {
    expect(snake.coordinates).toEqual([
      [560, 0],
      [560, 10],
      [560, 20],
    ]);
  });

  it("should properly calculate color when initialized", () => {
    expect(snake.color).toEqual("red");
  });

  it("should properly calculate shape when initialized", () => {
    expect(snake.shape).toEqual(Shape.Square);
  });

  it("should properly calculate head when initialized", () => {
    expect(snake.head).toEqual([560, 20]);
  });

  it("should properly calculate body when initialized", () => {
    expect(snake.body).toEqual([
      [560, 0],
      [560, 10],
    ]);
  });

  it("should properly calculate coordinates when increased", () => {
    snake.increase();

    expect(snake.coordinates).toEqual([
      [NaN, NaN],
      [560, 0],
      [560, 10],
      [560, 20],
    ]);
  });

  it("should properly calculate coordinates when moved down", () => {
    snake.move(Direction.Down);

    expect(snake.coordinates).toEqual([
      [560, 10],
      [560, 20],
      [560, 30],
    ]);
  });

  it("should properly calculate coordinates when moved left", () => {
    snake.move(Direction.Left);

    expect(snake.coordinates).toEqual([
      [560, 10],
      [560, 20],
      [550, 20],
    ]);
  });

  it("should properly calculate coordinates when moved right", () => {
    snake.move(Direction.Right);

    expect(snake.coordinates).toEqual([
      [560, 10],
      [560, 20],
      [570, 20],
    ]);
  });
});
