import { Shape } from "../consts/shape";
import { TPosition } from "../types";

export abstract class GameObject {
  public shape: Shape;
  public coordinates: TPosition[] = [];
  public color: string;
  public size: number;
  protected boundaryPoint: TPosition;

  protected constructor(
    shape: Shape,
    size: number,
    color: string,
    boundaryPoint: TPosition
  ) {
    this.shape = shape;
    this.size = size;
    this.color = color;
    this.boundaryPoint = boundaryPoint;
  }

  protected abstract create(coordinates?: TPosition[]): void;
}
