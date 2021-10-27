import { Prize } from "./prize";
import { Shape } from "../consts/shape";
import { Scores } from "@/game/core/consts/scores";
import { TPosition } from "../types";

export type TNormalPrizeOptions = {
  boundaryPoint: TPosition;
  size: number;
  unavailablePositions: TPosition[];
  color: string;
};

export class NormalPrize extends Prize {
  constructor({
    boundaryPoint,
    size,
    unavailablePositions = [],
    color,
  }: TNormalPrizeOptions) {
    super(
      Shape.Square,
      size,
      color,
      boundaryPoint,
      unavailablePositions,
      Scores.NormalPrize
    );
  }
}
