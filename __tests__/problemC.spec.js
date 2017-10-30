//problem config
const JS_FILE_PATH = 'problemC/js/index.js';

//dependencies
const fs = require('fs');
const path = require('path');

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

/** Begin tests **/

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    expect([JS_FILE_PATH]).toHaveNoEsLintErrors();
  })
});

test('Assignment is implemented', () => {
  throw new Error('Assignment not implemented');
})