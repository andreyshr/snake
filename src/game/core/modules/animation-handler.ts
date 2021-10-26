import { Nullable } from "../utils/utility-types";

interface IAnimationHandler {
  launch(cb: () => void, fps: number): void;
  stop(): void;
  pause(): void;
  resume(): void;
}

export class AnimationHandler implements IAnimationHandler {
  private requestId: Nullable<number> = null;
  private isPaused = false;

  launch(cb: () => void, fps: number): void {
    this.isPaused = false;

    const fpsInterval = 1000 / fps;
    let now: number;
    let elapsed: number;
    let then = Date.now();

    const animate = () => {
      this.requestId = requestAnimationFrame(animate);

      if (!this.isPaused) {
        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);

          cb();
        }
      }
    };

    animate();
  }

  stop(): void {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }
}
