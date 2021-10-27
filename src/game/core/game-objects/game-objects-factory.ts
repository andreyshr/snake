import { NormalPrize } from "./normal-prize";
import { SpecialPrize } from "./special-prize";
import { Snake } from "./snake";
import { Obstruction } from "./obstruction";
import { Geometry } from "../consts/geometry";
import { Color } from "../consts/color";
import { TPosition } from "../types";

interface IGameObjectsFactory {
  getNormalPrize(
    unavailablePositions: TPosition[],
    color?: string
  ): NormalPrize;
  getSpecialPrize(
    unavailablePositions: TPosition[],
    color?: string
  ): SpecialPrize;
  getSnake(length?: number, color?: string): Snake;
  getObstruction(coordinates: TPosition[], color?: string): Obstruction;
}

export class GameObjectsFactory implements IGameObjectsFactory {
  constructor(
    private boundaryPoint: TPosition = [
      Geometry.BoundaryPointX,
      Geometry.BoundaryPointY,
    ],
    private size: number = Geometry.GameObjectSize
  ) {}

  getNormalPrize(
    unavailablePositions: TPosition[],
    color?: string
  ): NormalPrize {
    return new NormalPrize({
      boundaryPoint: this.boundaryPoint,
      size: this.size,
      color: color || Color.Secondary,
      unavailablePositions,
    });
  }

  getSpecialPrize(
    unavailablePositions: TPosition[],
    color?: string
  ): SpecialPrize {
    return new SpecialPrize({
      boundaryPoint: this.boundaryPoint,
      size: this.size,
      color: color || Color.Accent,
      unavailablePositions,
    });
  }

  getSnake(length?: number, color?: string): Snake {
    return new Snake({
      initialLength: length || Geometry.SnakeLength,
      size: this.size,
      boundaryPoint: this.boundaryPoint,
      color: color || Color.Primary,
    });
  }

  getObstruction(coordinates: TPosition[], color?: string): Obstruction {
    return new Obstruction({
      coordinates,
      boundaryPoint: this.boundaryPoint,
      size: this.size,
      color: color || Color.Light,
    });
  }
}
