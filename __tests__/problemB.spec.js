//problem config
const JS_FILE_PATH = 'problemB/js/index.js';
const HTML_FILE_PATH = 'problemB/index.html';

//dependencies
const fs = require('fs');
const path = require('path');

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//load the HTML content to test with
const html = fs.readFileSync(HTML_FILE_PATH, 'utf-8');

/** Begin tests **/

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    expect([JS_FILE_PATH]).toHaveNoEsLintErrors();
  })
});

test('Assignment is implemented', () => {
  throw new Error('Assignment not implemented');
})
