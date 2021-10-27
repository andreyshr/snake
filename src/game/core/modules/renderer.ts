import { GameObject } from "../game-objects/game-object";
import { Shape } from "../consts/shape";
import { Geometry } from "../consts/geometry";
import { Color } from "../consts/color";
import { TPosition } from "../types";

interface IRenderer {
  render(obj: GameObject): Renderer;
  clear(boundaryPoint: TPosition, color: string): void;
}

export class Renderer implements IRenderer {
  private ctx: CanvasRenderingContext2D;
  private readonly boundaryPoint: TPosition;

  constructor(
    ctx: CanvasRenderingContext2D,
    boundaryPoint: TPosition = [
      Geometry.BoundaryPointX,
      Geometry.BoundaryPointY,
    ]
  ) {
    this.ctx = ctx;
    this.boundaryPoint = boundaryPoint;
  }

  render(...obj: GameObject[]): this {
    for (let i = 0; i < obj.length; i++) {
      const { color, shape, size, coordinates } = obj[i];
      this.ctx.fillStyle = color;

      if (shape === Shape.Square) {
        this.drawSquare(coordinates, size);
      }
      if (shape === Shape.Arc) {
        this.drawArc(coordinates, size);
      }
    }

    return this;
  }

  clear(boundaryPoint?: TPosition, color?: string): void {
    const [boundaryX, boundaryY] = boundaryPoint || this.boundaryPoint;
    this.ctx.fillStyle = color || Color.Background;
    this.ctx.fillRect(0, 0, boundaryX, boundaryY);
  }

  private drawSquare(positions: TPosition[], size: number) {
    for (let i = 0; i < positions.length; i++) {
      const [x, y] = positions[i];
      this.ctx.fillRect(x, y, size, size);
    }
  }

  private drawArc(positions: TPosition[], size: number) {
    for (let i = 0; i < positions.length; i++) {
      const [x, y] = positions[i];
      this.ctx.beginPath();
      this.ctx.arc(
        x + size / 2,
        y + size / 2,
        size / 1.6,
        0,
        Math.PI * 2,
        true
      );
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}
