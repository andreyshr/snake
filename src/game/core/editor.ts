import { Renderer } from "./modules/renderer";
import { CanvasToBlob } from "@/game/core/modules/canvas-to-blob";
import { GameObjectsFactory } from "./game-objects/game-objects-factory";
import { Obstruction } from "./game-objects/obstruction";
import { Position } from "./types";

type TEditorOptions = {
  boundaryPoint?: Position;
  objectSize?: number;
  userLevel?: Position[];
};

interface IEditor {
  getScreenshot(): Blob;
  getLevel(): Position[];
}

export class Editor implements IEditor {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly canvas: HTMLCanvasElement;
  private canvasToBlob: CanvasToBlob;
  private renderer: Renderer;
  private gameObjects: GameObjectsFactory;
  private obstruction: Obstruction;

  constructor(canvas: HTMLCanvasElement, options: TEditorOptions = {}) {
    const { boundaryPoint, objectSize, userLevel = [] } = options;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvasToBlob = new CanvasToBlob(canvas);
    this.renderer = new Renderer(this.ctx, boundaryPoint);
    this.gameObjects = new GameObjectsFactory(boundaryPoint, objectSize);
    this.obstruction = this.gameObjects.getObstruction(userLevel);

    this.init();
  }

  getScreenshot(): Blob {
    return this.canvasToBlob.getFile();
  }

  getLevel(): Position[] {
    return this.obstruction.coordinates;
  }

  private init(): void {
    this.addListeners();
    this.render();
  }

  private addListeners(): void {
    this.canvas.addEventListener("click", (evt) => {
      const [x, y] = this.getCursorPosition(evt);
      const dX = 20 - (x % 20);
      const dY = 20 - (y % 20);
      const position: Position = [x - (20 - dX), y - (20 - dY)];
      const positionIndex = this.obstruction.coordinates.findIndex(
        ([x, y]) => x === position[0] && y === position[1]
      );
      if (positionIndex !== -1)
        this.obstruction.coordinates.splice(positionIndex, 1);
      else this.obstruction.coordinates.push(position);

      this.render();
    });
  }

  private getCursorPosition(event: MouseEvent): Position {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
  }

  private render = () => {
    this.renderer.clear();
    this.renderer.render(this.obstruction);
  };
}
