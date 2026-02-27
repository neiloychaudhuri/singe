import { FormInputs } from "@/types";

type Breakpoint = [number, number];

function lerp(value: number, breakpoints: Breakpoint[]): number {
  if (value <= breakpoints[0][0]) return breakpoints[0][1];
  if (value >= breakpoints[breakpoints.length - 1][0])
    return breakpoints[breakpoints.length - 1][1];

  for (let i = 0; i < breakpoints.length - 1; i++) {
    const [x0, y0] = breakpoints[i];
    const [x1, y1] = breakpoints[i + 1];
    if (value >= x0 && value <= x1) {
      const t = (value - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return breakpoints[breakpoints.length - 1][1];
}

function scoreSleep(hours: number): number {
  return lerp(hours, [
    [0, 100],
    [2, 90],
    [4, 70],
    [6, 40],
    [8, 0],
  ]);
}

function scoreCaffeine(coffees: number): number {
  return lerp(coffees, [
    [0, 10],
    [1, 0],
    [2, 0],
    [3, 30],
    [4, 55],
    [5, 80],
  ]);
}

function scoreTabs(tabs: number): number {
  return lerp(tabs, [
    [1, 0],
    [5, 0],
    [10, 20],
    [20, 50],
    [30, 70],
    [50, 100],
  ]);
}

function scoreDeadline(hours: number): number {
  return lerp(hours, [
    [0, 100],
    [1, 95],
    [3, 75],
    [6, 50],
    [12, 20],
    [24, 0],
  ]);
}

function scoreGrass(hours: number): number {
  return lerp(hours, [
    [0, 0],
    [2, 0],
    [8, 20],
    [16, 50],
    [24, 70],
    [48, 100],
  ]);
}

export function calculateSingeScore(inputs: FormInputs): number {
  const subscales = {
    sleep: scoreSleep(inputs.sleepHours),
    caffeine: scoreCaffeine(inputs.coffees),
    tabs: scoreTabs(inputs.tabs),
    deadline: scoreDeadline(inputs.hoursToDeadline),
    grass: scoreGrass(inputs.hoursSinceGrass),
  };

  const weights: Record<string, number> = {
    sleep: 0.3,
    caffeine: 0.15,
    tabs: 0.15,
    deadline: 0.25,
    grass: 0.15,
  };

  return Math.round(
    Object.entries(subscales).reduce(
      (total, [key, value]) => total + value * weights[key],
      0
    )
  );
}
