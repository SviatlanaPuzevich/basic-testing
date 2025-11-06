import { jest } from '@jest/globals';
import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timerSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 2000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 2000);
    timerSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const intervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 1000);
    intervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');
    const param = 'path_to_file';
    await readFileAsynchronously(param);
    expect(pathSpy).toHaveBeenCalledWith(__dirname, param);
    pathSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const originalFsModule = jest.requireActual<typeof import('fs')>('fs');
    jest.doMock('fs', () => {
      return {
        ...originalFsModule,
        existsSync: jest.fn().mockReturnValue(false),
      };
    });
    jest.resetModules();
    const { readFileAsynchronously: readFileAsync } = await import('./index');
    const returnedValue = await readFileAsync('non existing path');
    expect(returnedValue).toBeNull();
    jest.unmock('fs');
  });

  test('should return file content if file exists', async () => {
    const originalFsModule = jest.requireActual<typeof import('fs')>('fs');
    const originalFsPromisesModule =
      jest.requireActual<typeof import('fs/promises')>('fs/promises');

    jest.doMock('fs', () => {
      return {
        ...originalFsModule,
        existsSync: jest.fn().mockReturnValue(true),
      };
    });
    jest.doMock('fs/promises', () => ({
      ...originalFsPromisesModule,
      readFile: jest
        .fn<() => Promise<Buffer>>()
        .mockResolvedValue(Buffer.from('mock promise')),
    }));

    jest.resetModules();
    const { readFileAsynchronously: readFileAsync } = await import('./index');
    const returnedValue = await readFileAsync('existing path');
    expect(returnedValue).toBe('mock promise');
    jest.unmock('fs');
    jest.unmock('fs/promises');
    jest.resetModules();
  });
});
