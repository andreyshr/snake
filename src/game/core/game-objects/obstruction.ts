import { GameObject } from "./game-object";
import { Shape } from "../consts/shape";
import { TPosition } from "../types";

export type TObstructionOptions = {
  size: number;
  coordinates: TPosition[];
  color: string;
  boundaryPoint: TPosition;
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

  protected create(coordinates: TPosition[]): void {
    this.coordinates = coordinates;
  }
}
