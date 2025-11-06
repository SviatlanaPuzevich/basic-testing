import { simpleCalculator, Action } from './index';

const validTestCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 4, action: Action.Divide, expected: 1 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
];

const invalidTestCases = [
  { a: null, b: 2, action: Action.Add },
  { a: 2, b: null, action: Action.Subtract },
  { a: 3, b: 2, action: 'unknown' as Action },
];

describe('simpleCalculator', () => {
  test.each(validTestCases)(
    `should calculate correctly for %# (%s)`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test.each(invalidTestCases)(
    'should return null for invalid arguments',
    ({ a, b, action }) => {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    },
  );
});
