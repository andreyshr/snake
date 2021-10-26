import { GameObjectsFactory } from "@/game/core/game-objects/game-objects-factory";
import { Geometry } from "@/game/core/consts/geometry";
import { Color } from "@/game/core/consts/color";

let gameObjectsFactory: GameObjectsFactory;

beforeEach(() => {
  gameObjectsFactory = new GameObjectsFactory();
});

describe("GameObjectsFactory", () => {
  it("should return default snake", () => {
    const snake = gameObjectsFactory.getSnake();

    expect(snake.coordinates.length).toEqual(Geometry.SnakeLength);
    expect(snake.color).toEqual(Color.Primary);
    expect(snake.size).toEqual(Geometry.GameObjectSize);
  });

  it("should return default normal prize", () => {
    const normalPrize = gameObjectsFactory.getNormalPrize([]);

    expect(normalPrize.color).toEqual(Color.Secondary);
    expect(normalPrize.size).toEqual(Geometry.GameObjectSize);
  });

  it("should return default special prize", () => {
    const specialPrize = gameObjectsFactory.getSpecialPrize([]);

    expect(specialPrize.color).toEqual(Color.Accent);
    expect(specialPrize.size).toEqual(Geometry.GameObjectSize);
  });

  it("should return default obstruction", () => {
    const obstruction = gameObjectsFactory.getObstruction([[10, 10]]);

    expect(obstruction.coordinates).toEqual([[10, 10]]);
    expect(obstruction.color).toEqual(Color.Light);
  });
});
