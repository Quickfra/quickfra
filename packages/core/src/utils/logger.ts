import type { LogLevel, LogEntry } from '../types.js';

export class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  debug(message: string, metadata?: Record<string, unknown>): void {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>): void {
    this.log('error', message, metadata);
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      ...(metadata && { metadata }),
    };

    this.logs.push(entry);

    // Output to console with appropriate method
    const consoleMethod = level === 'debug' ? 'debug' : 
                          level === 'info' ? 'info' : 
                          level === 'warn' ? 'warn' : 'error';
    
    const timestamp = entry.timestamp.toISOString();
    const metadataStr = metadata ? ` ${JSON.stringify(metadata)}` : '';
    
    console[consoleMethod](`[${timestamp}] ${level.toUpperCase()}: ${message}${metadataStr}`);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance();
