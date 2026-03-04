import { generateLinkedList } from './index';

const linkedList = generateLinkedList([1, 1]);
expect(linkedList).toMatchSnapshot();

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 2, 3]);
    console.log(linkedList);
    expect(linkedList).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            next: null,
            value: null,
          },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 2, 3]);
    expect(linkedList).toMatchSnapshot();
  });
});
