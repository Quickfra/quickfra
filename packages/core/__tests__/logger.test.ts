import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Logger, logger } from '../src/utils/logger.js';

// Mock console methods
const consoleSpy = {
  debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
  info: vi.spyOn(console, 'info').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Logger', () => {
  beforeEach(() => {
    logger.clearLogs();
    Object.values(consoleSpy).forEach(spy => spy.mockClear());
  });

  it('should be a singleton', () => {
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();
    expect(logger1).toBe(logger2);
  });

  it('should log debug messages', () => {
    logger.debug('Debug message', { extra: 'data' });
    
    expect(consoleSpy.debug).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] DEBUG: Debug message {"extra":"data"}/)
    );
    
    const logs = logger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0]).toMatchObject({
      level: 'debug',
      message: 'Debug message',
      metadata: { extra: 'data' },
    });
  });

  it('should log info messages', () => {
    logger.info('Info message');
    
    expect(consoleSpy.info).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] INFO: Info message/)
    );
    
    const logs = logger.getLogs();
    expect(logs[0].level).toBe('info');
  });

  it('should log warn messages', () => {
    logger.warn('Warning message');
    
    expect(consoleSpy.warn).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] WARN: Warning message/)
    );
    
    const logs = logger.getLogs();
    expect(logs[0].level).toBe('warn');
  });

  it('should log error messages', () => {
    logger.error('Error message');
    
    expect(consoleSpy.error).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] ERROR: Error message/)
    );
    
    const logs = logger.getLogs();
    expect(logs[0].level).toBe('error');
  });

  it('should handle messages without metadata', () => {
    logger.info('Simple message');
    
    expect(consoleSpy.info).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] INFO: Simple message$/)
    );
    
    const logs = logger.getLogs();
    expect(logs[0]).toMatchObject({
      level: 'info',
      message: 'Simple message',
    });
    expect(logs[0].metadata).toBeUndefined();
  });

  it('should clear logs', () => {
    logger.info('Message 1');
    logger.info('Message 2');
    expect(logger.getLogs()).toHaveLength(2);
    
    logger.clearLogs();
    expect(logger.getLogs()).toHaveLength(0);
  });

  it('should return copies of logs', () => {
    logger.info('Test message');
    const logs1 = logger.getLogs();
    const logs2 = logger.getLogs();
    
    expect(logs1).not.toBe(logs2);
    expect(logs1).toEqual(logs2);
  });
});
