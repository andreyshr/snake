import { CollisionChecker } from "@/game/core/modules/collision-checker";

describe(CollisionChecker, () => {
  it("should call callbackFn when collision fired", () => {
    const collisionChecker = new CollisionChecker();
    const callbackFn = jest.fn();

    collisionChecker.checkCollision(
      [
        [10, 10],
        [20, 20],
      ],
      [20, 20],
      callbackFn
    );

    expect(callbackFn).toHaveBeenCalled();
  });

  it("should not call callbackFn when collision not fired", () => {
    const collisionChecker = new CollisionChecker();
    const callbackFn = jest.fn();

    collisionChecker.checkCollision(
      [
        [10, 10],
        [20, 30],
      ],
      [20, 20],
      callbackFn
    );

    expect(callbackFn).not.toHaveBeenCalled();
  });
});
