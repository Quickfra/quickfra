import { describe, it, expect, beforeEach, vi } from 'vitest';
import { bootstrap, CoolifyInstaller } from '../src/bootstrap.js';
import { MockAddon } from '../../addon-mock/src/index.js';
import { logger } from '../src/utils/logger.js';
import type { ProvisionResult } from '../src/index.js';

// Mock console methods for addon installations
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
// Mock logger methods for bootstrap and Coolify installation  
const loggerInfoSpy = vi.spyOn(logger, 'info').mockImplementation(() => {});
const loggerErrorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});

describe('bootstrap', () => {
  let mockContext: ProvisionResult;

  beforeEach(() => {
    consoleSpy.mockClear();
    loggerInfoSpy.mockClear();
    loggerErrorSpy.mockClear();
    mockContext = {
      id: 'test-instance-123',
      ip: '192.168.1.100',
      region: 'us-east-1',
      status: 'running',
      metadata: { instanceType: 't3.micro' },
    };
  });

  it('should install Coolify first with no addons', async () => {
    await bootstrap(mockContext, {});

    // Should have log messages for Coolify installation
    expect(loggerInfoSpy).toHaveBeenCalledWith(
      'Installing Coolify on VM',
      expect.any(Object)
    );
  });

  it('should install Coolify before any addons', async () => {
    const mailAddon = new MockAddon('mail');
    const statusAddon = new MockAddon('status');

    await bootstrap(mockContext, {
      addons: [mailAddon, statusAddon],
      coolifyVersion: '4.0.0',
    });

    // Check the order of logger calls
    const calls = loggerInfoSpy.mock.calls.map(call => call[0]);
    
    // Find indices of key messages
    const coolifyIndex = calls.findIndex(msg => 
      typeof msg === 'string' && msg.includes('Installing Coolify')
    );
    const mailIndex = calls.findIndex(msg => 
      typeof msg === 'string' && msg.includes('Installing addon: mail')
    );
    const statusIndex = calls.findIndex(msg => 
      typeof msg === 'string' && msg.includes('Installing addon: status')
    );

    // Coolify should be installed first
    expect(coolifyIndex).toBeGreaterThan(-1);
    expect(mailIndex).toBeGreaterThan(coolifyIndex);
    expect(statusIndex).toBeGreaterThan(coolifyIndex);
  });

  it('should deduplicate addons while preserving order', async () => {
    const mailAddon1 = new MockAddon('mail');
    const statusAddon = new MockAddon('status');
    const mailAddon2 = new MockAddon('mail'); // duplicate

    await bootstrap(mockContext, {
      addons: [mailAddon1, statusAddon, mailAddon2],
    });

    const calls = loggerInfoSpy.mock.calls.map(call => call[0]);
    
    // Count occurrences of mail addon installation
    const mailInstallations = calls.filter(msg => 
      typeof msg === 'string' && msg.includes('Installing addon: mail')
    );
    
    expect(mailInstallations).toHaveLength(1);
  });

  it('should preserve addon installation order', async () => {
    const addons = [
      new MockAddon('first'),
      new MockAddon('second'),
      new MockAddon('third'),
    ];

    await bootstrap(mockContext, { addons });

    const calls = loggerInfoSpy.mock.calls.map(call => call[0]);
    
    const firstIndex = calls.findIndex(msg => 
      typeof msg === 'string' && msg.includes('Installing addon: first')
    );
    const secondIndex = calls.findIndex(msg => 
      typeof msg === 'string' && msg.includes('Installing addon: second')
    );
    const thirdIndex = calls.findIndex(msg => 
      typeof msg === 'string' && msg.includes('Installing addon: third')
    );

    expect(firstIndex).toBeLessThan(secondIndex);
    expect(secondIndex).toBeLessThan(thirdIndex);
  });

  it('should handle bootstrap failure gracefully', async () => {
    // Mock CoolifyInstaller.run to throw an error
    const originalRun = CoolifyInstaller.run;
    CoolifyInstaller.run = vi.fn().mockRejectedValue(new Error('Installation failed'));

    await expect(bootstrap(mockContext, {})).rejects.toThrow('Installation failed');

    // Restore original method
    CoolifyInstaller.run = originalRun;
  });

  it('should pass coolify configuration correctly', async () => {
    const runSpy = vi.spyOn(CoolifyInstaller, 'run').mockResolvedValue();

    await bootstrap(mockContext, {
      coolifyVersion: '4.1.0',
      coolifyConfig: { domain: 'coolify.local' },
      coolifyEnvironment: { NODE_ENV: 'production' },
    });

    expect(runSpy).toHaveBeenCalledWith(mockContext, {
      version: '4.1.0',
      config: { domain: 'coolify.local' },
      environment: { NODE_ENV: 'production' },
    });

    runSpy.mockRestore();
  });
});

describe('CoolifyInstaller', () => {
  let mockContext: ProvisionResult;

  beforeEach(() => {
    consoleSpy.mockClear();
    loggerInfoSpy.mockClear();
    loggerErrorSpy.mockClear();
    mockContext = {
      id: 'test-instance-456',
      ip: '10.0.0.1',
      region: 'eu-west-1',
      status: 'running',
    };
  });

  it('should install Coolify with default options', async () => {
    const startTime = Date.now();
    await CoolifyInstaller.run(mockContext);
    const duration = Date.now() - startTime;

    // Should take at least 200ms (the simulated installation time)
    expect(duration).toBeGreaterThanOrEqual(199);
  });

  it('should install Coolify with custom options', async () => {
    await CoolifyInstaller.run(mockContext, {
      version: '4.2.0',
      config: { ssl: 'true' },
      environment: { DEBUG: 'true' },
    });

    // Should complete without errors
    expect(true).toBe(true);
  });
});
