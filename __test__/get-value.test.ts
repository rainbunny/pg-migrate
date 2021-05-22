import {getValue} from '@lib/get-value';

describe('getValue', () => {
  it('returns correct value', () => {
    expect(getValue('abc', 'def')).toMatchInlineSnapshot(`"abc"`);
  });
  it('returns alternative value if the input value is blank', () => {
    expect(getValue(undefined, 'def')).toMatchInlineSnapshot(`"def"`);
  });
});

export {};
