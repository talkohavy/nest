import { LogLevel } from '../types';

export const LogLevelToNumber: Record<LogLevel, number> = {
  [LogLevel.FATAL]: 0,
  [LogLevel.ERROR]: 1,
  [LogLevel.WARN]: 3,
  [LogLevel.INFO]: 4,
  [LogLevel.DEBUG]: 5,
};
