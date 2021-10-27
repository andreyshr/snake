import { GameObject } from "./game-object";
import { Shape } from "../consts/shape";
import { Scores } from "@/game/core/consts/scores";
import { TPosition } from "../types";

export abstract class Prize extends GameObject {
  private unavailablePositions: TPosition[];
  public readonly scores: number;

  protected constructor(
    shape: Shape,
    size: number,
    color: string,
    boundaryPoint: TPosition,
    unavailablePositions: TPosition[],
    scores: Scores = 0
  ) {
    super(shape, size, color, boundaryPoint);

    this.unavailablePositions = unavailablePositions;
    this.scores = scores;

    this.create();
  }

  private static randStep(min: number, max: number, step: number): number {
    return min + step * Math.floor((Math.random() * (max - min)) / step);
  }

  protected create(): void {
    let isUnavailablePosition = false;
    const [boundaryX, boundaryY] = this.boundaryPoint;
    do {
      const position: TPosition = [
        Prize.randStep(0, boundaryX, this.size),
        Prize.randStep(0, boundaryY, this.size),
      ];
      this.coordinates = [position];
      isUnavailablePosition = this.unavailablePositions.some(
        (coords) => coords[0] === position[0] && coords[1] === position[1]
      );
    } while (isUnavailablePosition);
  }
}
