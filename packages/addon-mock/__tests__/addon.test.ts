import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MockAddon, mockAddons } from '../src/index.js';
import type { ProvisionResult, AddonOpts } from '@quickfra/core';

// Mock console methods
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('MockAddon', () => {
  let mockContext: ProvisionResult;

  beforeEach(() => {
    consoleSpy.mockClear();
    mockContext = {
      id: 'test-instance-789',
      ip: '172.16.0.1',
      region: 'ap-southeast-1',
      status: 'running',
      metadata: { instanceType: 't3.small' },
    };
  });

  it('should have a name property', () => {
    const addon = new MockAddon('test-addon');
    expect(addon.name).toBe('test-addon');
  });

  it('should install addon with basic options', async () => {
    const addon = new MockAddon('basic-addon');
    const opts: AddonOpts = {};

    await addon.install(mockContext, opts);

    expect(consoleSpy).toHaveBeenCalledWith(
      `Installing addon "basic-addon" in Coolify on ${mockContext.ip}`
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      `✓ Addon "basic-addon" installed successfully in Coolify`
    );
  });

  it('should install addon with all options', async () => {
    const addon = new MockAddon('full-addon');
    const opts: AddonOpts = {
      version: '1.2.3',
      config: {
        host: 'localhost',
        port: '3000',
        ssl: 'true',
      },
      environment: {
        NODE_ENV: 'production',
        DEBUG: 'false',
      },
    };

    await addon.install(mockContext, opts);

    expect(consoleSpy).toHaveBeenCalledWith('  Version: 1.2.3');
    expect(consoleSpy).toHaveBeenCalledWith('  Configuration keys: host, port, ssl');
    expect(consoleSpy).toHaveBeenCalledWith('  Environment variables: 2');
  });

  it('should take at least 150ms to install', async () => {
    const addon = new MockAddon('timing-addon');
    
    const startTime = Date.now();
    await addon.install(mockContext, {});
    const duration = Date.now() - startTime;

    expect(duration).toBeGreaterThanOrEqual(149);
  });

  it('should handle empty config and environment objects', async () => {
    const addon = new MockAddon('empty-addon');
    const opts: AddonOpts = {
      config: {},
      environment: {},
    };

    await addon.install(mockContext, opts);

    // Should not log config or environment lines for empty objects
    const calls = consoleSpy.mock.calls.map(call => call[0]);
    expect(calls.some(msg => msg.includes('Configuration keys:'))).toBe(false);
    expect(calls.some(msg => msg.includes('Environment variables:'))).toBe(false);
  });
});

describe('mockAddons', () => {
  it('should provide predefined addons', () => {
    expect(mockAddons.mail.name).toBe('mail');
    expect(mockAddons.status.name).toBe('status');
    expect(mockAddons.monitoring.name).toBe('monitoring');
    expect(mockAddons.backup.name).toBe('backup');
  });

  it('should have IAddon interface compatibility', () => {
    const addon = mockAddons.mail;
    expect(typeof addon.name).toBe('string');
    expect(typeof addon.install).toBe('function');
  });
});
