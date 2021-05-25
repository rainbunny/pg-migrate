import {getTargetVersion} from '@lib/get-target-version';

describe('getTargetVersion', () => {
  it('returns correct value', () => {
    process.argv = ['node', 'pg-migrate', 'up', '001-add-auth'];
    expect(getTargetVersion()).toMatchInlineSnapshot(`"001-add-auth"`);
  });

  it('returns blank value if the input value is blank', () => {
    process.argv = ['node', 'pg-migrate', 'up', '--user', 'admin'];
    expect(getTargetVersion()).toMatchInlineSnapshot(`""`);

    process.argv = ['node', 'pg-migrate', 'up'];
    expect(getTargetVersion()).toMatchInlineSnapshot(`""`);
  });
});

export {};
