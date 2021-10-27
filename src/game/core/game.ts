import { Renderer } from "./modules/renderer";
import { AnimationHandler } from "./modules/animation-handler";
import { CollisionChecker } from "./modules/collision-checker";
import { AutoDirection } from "@/game/core/modules/auto-direction";
import { GameObjectsFactory } from "./game-objects/game-objects-factory";
import { Snake } from "./game-objects/snake";
import { Prize } from "./game-objects/prize";
import { SpecialPrize } from "./game-objects/special-prize";
import { Obstruction } from "./game-objects/obstruction";
import { KeyCode } from "./consts/key-code";
import { Direction } from "./consts/direction";
import { levels as baseLevels } from "../levels";
import { TPosition, TLevel } from "./types";

type TGameOptions = {
  boundaryPoint?: TPosition;
  objectSize?: number;
  speed?: number;
  level?: number;
  userLevel?: TPosition[];
};

interface IGame {
  scores: number;
  start(): void;
  stop(): void;
  restart(options: TGameOptions): void;
  pause(): void;
  resume(): void;
  onRestart?(scores: number): void;
  onStop?(scores: number): void;
  onChangeScores?(scores: number): void;
  autoplay(): void;
  getLevelsList(): TLevel[];
}

export class Game implements IGame {
  public onRestart?: (scores: number) => void;
  public onStop?: (scores: number) => void;
  public onChangeScores?: (scores: number) => void;
  private readonly ctx: CanvasRenderingContext2D;
  private renderer: Renderer;
  private animationHandler: AnimationHandler;
  private collisionChecker: CollisionChecker;
  private gameObjects: GameObjectsFactory;
  private snake: Snake;
  private obstruction: Obstruction;
  private prize: Prize;
  private autoDirection = new AutoDirection();
  private _scores = 0;
  private direction = Direction.Down;
  private isDirectionChanged = false;
  private speed: number;
  private prizesCounter = 0;
  private isAutoplay = false;
  private withUserLevel = false;
  private readonly levels: TPosition[][];
  private static defaultLevel: TLevel = {
    value: -1,
    title: "free play",
  };

  constructor(canvas: HTMLCanvasElement, options: TGameOptions = {}) {
    const {
      boundaryPoint,
      objectSize,
      level = -1,
      speed = 20,
      userLevel = null,
    } = options;

    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.renderer = new Renderer(this.ctx, boundaryPoint);
    this.animationHandler = new AnimationHandler();
    this.collisionChecker = new CollisionChecker();
    this.gameObjects = new GameObjectsFactory(boundaryPoint, objectSize);
    this.snake = this.gameObjects.getSnake();
    this.levels = [...baseLevels, userLevel || []].filter((l) => l.length);
    this.obstruction = this.gameObjects.getObstruction(
      this.levels[level] || []
    );
    this.prize = this.gameObjects.getNormalPrize(this.unavailablePositions);
    this.speed = speed;
    this.withUserLevel = !!(userLevel && userLevel.length);
  }

  get scores(): number {
    return this._scores;
  }

  set scores(val: number) {
    this._scores = val;
    if (typeof this.onChangeScores === "function")
      this.onChangeScores(this._scores);
  }

  autoplay(): void {
    this.isAutoplay = true;
    this.animationHandler.launch(this.animate, this.speed);
  }

  start(): void {
    this.animationHandler.launch(this.animate, this.speed);
    this.addListeners();
  }

  stop = (): void => {
    this.animationHandler.stop();
    this.removeListeners();
    if (typeof this.onStop === "function") this.onStop(this._scores);
  };

  restart({ speed = 0, level = -1 }: TGameOptions): void {
    this.stop();
    this.init({ speed, level });
    this.start();
    if (typeof this.onRestart === "function") this.onRestart(this._scores);
  }

  pause = (): void => {
    this.animationHandler.pause();
  };

  resume = (): void => {
    this.animationHandler.resume();
  };

  getLevelsList(): TLevel[] {
    return [
      Game.defaultLevel,
      ...this.levels.map((_, i) =>
        this.withUserLevel && i === this.levels.length - 1
          ? { value: i, title: "user level" }
          : { value: i, title: i + 1 }
      ),
    ];
  }

  private get unavailablePositions(): TPosition[] {
    return [...this.snake.coordinates, ...this.obstruction.coordinates];
  }

  private addListeners() {
    document.addEventListener("keydown", this.changeDirection);
    Array.from(document.querySelectorAll(".touch-control button")).forEach(
      (button) => {
        button.addEventListener("touchstart", this.changeDirection);
      }
    );
  }

  private removeListeners() {
    document.removeEventListener("keydown", this.changeDirection);
    Array.from(document.querySelectorAll(".touch-control button")).forEach(
      (button) => {
        button.removeEventListener("touchstart", this.changeDirection);
      }
    );
  }

  private init({ level = -1, speed = 20 }: TGameOptions) {
    this.snake = this.gameObjects.getSnake();
    this.obstruction = this.gameObjects.getObstruction(
      this.levels[level] || []
    );
    this.prize = this.gameObjects.getNormalPrize(this.unavailablePositions);
    this.isDirectionChanged = false;
    this.direction = Direction.Down;
    this.scores = 0;
    this.speed = speed;
    this.prizesCounter = 0;

    this.renderer.clear();
  }

  private animate = () => {
    if (this.isAutoplay)
      this.direction = this.autoDirection.getNextDirection(this.direction);

    this.renderer.clear();
    this.snake.move(this.direction);

    this.collisionChecker
      .checkCollision(this.snake.body, this.snake.head, this.stop)
      .checkCollision(this.obstruction.coordinates, this.snake.head, this.stop)
      .checkCollision(
        this.prize.coordinates,
        this.snake.head,
        this.onPrizeCollision
      );

    if (this.prize instanceof SpecialPrize && !this.prize.isAvailable) {
      this.prize = this.gameObjects.getNormalPrize(this.unavailablePositions);
    }

    this.renderer.render(this.snake, this.prize, this.obstruction);

    this.isDirectionChanged = false;
  };

  private onPrizeCollision = () => {
    this.snake.increase();
    this.scores += this.prize.scores;
    this.prizesCounter += 1;
    if (this.prizesCounter % 5 === 0) {
      this.prize = this.gameObjects.getSpecialPrize(this.unavailablePositions);
      this.prizesCounter = 0;
    } else {
      this.prize = this.gameObjects.getNormalPrize(this.unavailablePositions);
    }
  };

  private changeDirection: EventListener = (evt) => {
    if (this.isDirectionChanged) return;
    this.isDirectionChanged = true;
    evt.preventDefault();

    let code;
    if (evt instanceof KeyboardEvent) code = evt.code;
    else if (evt instanceof TouchEvent) code = (evt.target as HTMLElement).id;

    if (code === KeyCode.ArrowUp && this.direction !== Direction.Down) {
      this.direction = Direction.Up;
    }
    if (code === KeyCode.ArrowLeft && this.direction !== Direction.Right) {
      this.direction = Direction.Left;
    }
    if (code === KeyCode.ArrowRight && this.direction !== Direction.Left) {
      this.direction = Direction.Right;
    }
    if (code === KeyCode.ArrowDown && this.direction !== Direction.Up) {
      this.direction = Direction.Down;
    }
  };
}
