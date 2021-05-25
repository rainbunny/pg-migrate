import {getMode} from '@lib/get-mode';

describe('getMode', () => {
  it('returns up mode', () => {
    process.argv = ['node', 'migrate', 'up'];
    expect(getMode()).toMatchInlineSnapshot(`"up"`);
  });

  it('returns up mode', () => {
    process.argv = ['node', 'migrate', 'down'];
    expect(getMode()).toMatchInlineSnapshot(`"down"`);
  });

  it('throws error if mode is invalid', () => {
    process.argv = ['node', 'migrate', 'asw'];
    expect(() => getMode()).toThrow('Invalid migration operation: asw');

    process.argv = ['node', 'migrate'];
    expect(() => getMode()).toThrow('Invalid migration operation: ');
  });
});

export {};
