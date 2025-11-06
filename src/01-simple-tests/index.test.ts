import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(sum).toEqual(8);
  });

  test('should subtract two numbers', () => {
    const subtract = simpleCalculator({
      a: 0,
      b: -10,
      action: Action.Subtract,
    });
    expect(subtract).toEqual(10);
  });

  test('should multiply two numbers', () => {
    const multiply = simpleCalculator({ a: 20, b: 3, action: Action.Multiply });
    expect(multiply).toEqual(60);
  });

  test('should divide two numbers', () => {
    const divide = simpleCalculator({ a: 30, b: 3, action: Action.Divide });
    expect(divide).toEqual(10);
  });

  test('should exponentiate two numbers', () => {
    const exponentiate = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(exponentiate).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const invalid = simpleCalculator({
      a: 2,
      b: 0,
      action: 'invalid' as Action,
    });
    expect(invalid).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalid = simpleCalculator({
      a: 2,
      b: null,
      action: Action.Add,
    });
    expect(invalid).toBeNull();
  });
});
