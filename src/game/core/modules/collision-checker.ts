import { TPosition } from "../types";

interface ICollisionChecker {
  checkCollision(
    positions: TPosition[],
    position: TPosition,
    cb: () => void
  ): void;
}

export class CollisionChecker implements ICollisionChecker {
  checkCollision(
    positions: TPosition[] = [],
    position: TPosition,
    cb: () => void
  ): this {
    let isCollision = false;
    const [x, y] = position;

    for (let i = 0; i < positions.length; i++) {
      const [_x, _y] = positions[i];
      if (_x === x && _y === y) {
        isCollision = true;
        break;
      }
    }

    if (isCollision) cb();

    return this;
  }
}
