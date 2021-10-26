import { Shape } from "../consts/shape";
import { Position } from "../types";

export abstract class GameObject {
  public shape: Shape;
  public coordinates: Position[] = [];
  public color: string;
  public size: number;
  protected boundaryPoint: Position;

  protected constructor(
    shape: Shape,
    size: number,
    color: string,
    boundaryPoint: Position
  ) {
    this.shape = shape;
    this.size = size;
    this.color = color;
    this.boundaryPoint = boundaryPoint;
  }

  protected abstract create(coordinates?: Position[]): void;
}
