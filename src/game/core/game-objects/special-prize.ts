import { Prize } from "./prize";
import { Shape } from "../consts/shape";
import { Scores } from "@/game/core/consts/scores";
import { TPosition } from "../types";

export type TSpecialPrizeOptions = {
  boundaryPoint: TPosition;
  size: number;
  unavailablePositions: TPosition[];
  color: string;
};

export class SpecialPrize extends Prize {
  public isAvailable = true;
  public readonly lifeTime = 3000;

  constructor({
    boundaryPoint,
    size,
    unavailablePositions = [],
    color,
  }: TSpecialPrizeOptions) {
    super(
      Shape.Arc,
      size,
      color,
      boundaryPoint,
      unavailablePositions,
      Scores.SpecialPrize
    );

    setTimeout(() => {
      this.isAvailable = false;
    }, this.lifeTime);
  }
}
