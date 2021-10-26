import { GameObject } from "./game-object";
import { Direction } from "../consts/direction";
import { Shape } from "../consts/shape";
import { Position } from "../types";

export type TSnakeOptions = {
  initialLength: number;
  size: number;
  boundaryPoint: Position;
  color: string;
};

export class Snake extends GameObject {
  private readonly initialLength: number;
  private readonly startPosition: Position = [560, 20];

  constructor({ initialLength, size, boundaryPoint, color }: TSnakeOptions) {
    super(Shape.Square, size, color, boundaryPoint);

    this.initialLength = initialLength;

    this.create();
  }

  get head(): Position {
    return this.coordinates[this.coordinates.length - 1];
  }

  get body(): Position[] {
    return this.coordinates.filter(
      (position: Position, i: number) => i !== this.coordinates.length - 1
    );
  }

  protected create(): void {
    const [startX, startY] = this.startPosition;
    for (let i = 0; i < this.initialLength; i++) {
      this.coordinates.unshift([startX, startY - this.size * i]);
    }
  }

  move(direction: string): void {
    this.extractTail();
    const head: Position = [0, 0];
    const [boundaryX, boundaryY] = this.boundaryPoint;

    if (direction === Direction.Down) {
      head[1] = this.isCollisionDown() ? 0 : this.head[1] + this.size;
      head[0] = this.head[0];
    }
    if (direction === Direction.Up) {
      head[1] = this.isCollisionUp()
        ? boundaryY - this.size
        : this.head[1] - this.size;
      head[0] = this.head[0];
    }
    if (direction === Direction.Left) {
      head[0] = this.isCollisionLeft()
        ? boundaryX - this.size
        : this.head[0] - this.size;
      head[1] = this.head[1];
    }
    if (direction === Direction.Right) {
      head[0] = this.isCollisionRight() ? 0 : this.head[0] + this.size;
      head[1] = this.head[1];
    }

    this.insertHead(head);
  }

  increase(): void {
    this.insertTail();
  }

  private insertTail(): void {
    const tail: Position = [NaN, NaN];
    this.coordinates.unshift(tail);
  }

  private extractTail(): Position | undefined {
    return this.coordinates.shift();
  }

  private insertHead(head: Position) {
    this.coordinates.push(head);
  }

  private isCollisionDown() {
    const [, headY] = this.head;
    const [, boundaryY] = this.boundaryPoint;

    return headY === boundaryY - this.size;
  }

  private isCollisionUp() {
    const [, headY] = this.head;

    return headY === 0;
  }

  private isCollisionLeft() {
    const [headX] = this.head;

    return headX === 0;
  }

  private isCollisionRight() {
    const [headX] = this.head;
    const [boundaryX] = this.boundaryPoint;

    return headX === boundaryX - this.size;
  }
}
