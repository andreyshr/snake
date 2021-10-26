import { Direction } from "@/game/core/consts/direction";
import { randomEnum } from "@/game/core/utils/random-enum";

export const timeout = 1000;

interface IAutoDirection {
  getNextDirection(direction: Direction): Direction;
}

export class AutoDirection implements IAutoDirection {
  private isCalled = false;

  getNextDirection(prevDirection: Direction): Direction {
    if (this.isCalled) return prevDirection;

    this.isCalled = true;
    setTimeout(() => {
      this.isCalled = false;
    }, timeout);

    return randomEnum(Direction, [
      prevDirection,
      AutoDirection.getOppositeDirection(prevDirection),
    ]);
  }

  private static getOppositeDirection(direction: Direction): Direction {
    switch (direction) {
      case Direction.Up:
        return Direction.Down;
      case Direction.Down:
        return Direction.Up;
      case Direction.Left:
        return Direction.Right;
      case Direction.Right:
        return Direction.Left;
    }
  }
}
