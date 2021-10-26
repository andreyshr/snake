import { GameObject } from "./game-object";
import { Shape } from "../consts/shape";
import { Position } from "../types";

export type TObstructionOptions = {
  size: number;
  coordinates: Position[];
  color: string;
  boundaryPoint: Position;
};

export class Obstruction extends GameObject {
  constructor({
    coordinates,
    size,
    boundaryPoint,
    color,
  }: TObstructionOptions) {
    super(Shape.Square, size, color, boundaryPoint);

    this.create(coordinates);
  }

  protected create(coordinates: Position[]): void {
    this.coordinates = coordinates;
  }
}
