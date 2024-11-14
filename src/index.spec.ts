import { add } from "./index"

test('testing requirements', () => {
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
});

describe('add', () => {

  it('should be defined', () => {
    expect(add).toBeDefined()
  });

  it('should resolve simple additions', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should work with negatie numbers', () => {
    expect(add(1, -1)).toBe(0);
  });
});
