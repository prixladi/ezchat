import winston from 'winston';
import expressWinston from 'express-winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  transports: [new winston.transports.Console()],
});

export const loggingMiddleware = expressWinston.logger({
  level: 'info',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  meta: false,
  expressFormat: true,
  colorize: false,
});
