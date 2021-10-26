import { AutoDirection, timeout } from "@/game/core/modules/auto-direction";
import { Direction } from "@/game/core/consts/direction";

afterEach(() => {
  jest.useRealTimers();
});

describe("AutoDirection", () => {
  it("should return properly direction when previous direction 'Left' and timer is not fired", () => {
    const autoDirection = new AutoDirection();
    const direction = autoDirection.getNextDirection(Direction.Left);

    expect([Direction.Up, Direction.Down]).toContain(direction);
  });

  it("should return properly direction when previous direction 'Right' and timer is not fired", () => {
    const autoDirection = new AutoDirection();
    const direction = autoDirection.getNextDirection(Direction.Right);

    expect([Direction.Up, Direction.Down]).toContain(direction);
  });

  it("should return properly direction when previous direction 'Up' and timer is not fired", () => {
    const autoDirection = new AutoDirection();
    const direction = autoDirection.getNextDirection(Direction.Up);

    expect([Direction.Left, Direction.Right]).toContain(direction);
  });

  it("should return properly direction when previous direction 'Down' and timer is not fired", () => {
    const autoDirection = new AutoDirection();
    const direction = autoDirection.getNextDirection(Direction.Up);

    expect([Direction.Left, Direction.Right]).toContain(direction);
  });

  it("should return properly direction while the timeout is in effect", () => {
    jest.useFakeTimers();
    const autoDirection = new AutoDirection();
    autoDirection.getNextDirection(Direction.Left);
    jest.advanceTimersByTime(timeout - 1);

    const direction = autoDirection.getNextDirection(Direction.Left);

    expect(direction).toEqual(Direction.Left);
  });
});
