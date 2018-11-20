// Type definitions for Include MQ
// Project: include-mq
// Definitions by: Jan Marsicek <https://github.com/janmarsicek>

declare module 'include-mq';

export interface Breakpoints {
  [breakpoint: string]: string;
}

export interface UnitIntervals {
  [unit: string]: number;
}

export interface ConfigOptions {
  breakpoints?: Breakpoints;
  unitIntervals?: UnitIntervals;
}

export type IncludeMQFunction = (rule: string) => string;

export const im: (configOptions: ConfigOptions) => IncludeMQFunction;
