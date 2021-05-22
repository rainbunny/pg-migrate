import {getScriptParams} from '@lib/get-script-params';

describe('getScriptParams', () => {
  it('returns correct params', () => {
    process.argv = ['script', '--param1', 'value1', '--param2', 'value2'];
    expect(getScriptParams()).toMatchInlineSnapshot(`
      Object {
        "params": Object {
          "param1": "value1",
          "param2": "value2",
        },
      }
    `);
  });
});

export {};
