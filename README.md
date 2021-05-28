# JSLint, The JavaScript Code Quality Tool

Douglas Crockford
douglas@crockford.com

# Status
| Branch | [master<br>(v2021.5.27)](https://github.com/jslint-org/jslint/tree/master) | [beta<br>(testing)](https://github.com/jslint-org/jslint/tree/beta) | [alpha<br>(development)](https://github.com/jslint-org/jslint/tree/alpha) |
|--:|:--:|:--:|:--:|
| CI | [![ci](https://github.com/jslint-org/jslint/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/jslint-org/jslint/actions?query=branch%3Amaster) | [![ci](https://github.com/jslint-org/jslint/actions/workflows/ci.yml/badge.svg?branch=beta)](https://github.com/jslint-org/jslint/actions?query=branch%3Abeta) | [![ci](https://github.com/jslint-org/jslint/actions/workflows/ci.yml/badge.svg?branch=alpha)](https://github.com/jslint-org/jslint/actions?query=branch%3Aalpha) |
| Coverage | [![coverage](https://jslint-org.github.io/jslint/branch-master/.build/coverage/coverage-badge.svg)](https://jslint-org.github.io/jslint/branch-master/.build/coverage/index.html) | [![coverage](https://jslint-org.github.io/jslint/branch-beta/.build/coverage/coverage-badge.svg)](https://jslint-org.github.io/jslint/branch-beta/.build/coverage/index.html) | [![coverage](https://jslint-org.github.io/jslint/branch-alpha/.build/coverage/coverage-badge.svg)](https://jslint-org.github.io/jslint/branch-alpha/.build/coverage/index.html) |
| Demo | [<img src="image-window-maximize-regular.svg" height="30">](https://jslint-org.github.io/jslint/branch-master/index.html) | [<img src="image-window-maximize-regular.svg" height="30">](https://jslint-org.github.io/jslint/branch-beta/index.html) | [<img src="image-window-maximize-regular.svg" height="30">](https://jslint-org.github.io/jslint/branch-alpha/index.html) |
| Artifacts | [<img src="image-folder-open-solid.svg" height="30">](https://github.com/jslint-org/jslint/tree/gh-pages/branch-master/.build) | [<img src="image-folder-open-solid.svg" height="30">](https://github.com/jslint-org/jslint/tree/gh-pages/branch-beta/.build) | [<img src="image-folder-open-solid.svg" height="30">](https://github.com/jslint-org/jslint/tree/gh-pages/branch-alpha/.build) |

# Live Web Demo
- https://www.jslint.com/index.html

[![screenshot](https://jslint-org.github.io/jslint/branch-beta/.build/screenshot.browser._2fjslint_2fbranch-beta_2findex.html.png)](https://jslint-org.github.io/jslint/index.html)

# Installation
1. Download https://www.jslint.com/jslint.js and rename to `jslint.mjs`
```shell
#!/bin/sh
curl -L https://www.jslint.com/jslint.js > jslint.mjs
```

2. To run `jslint.mjs` from command-line:
```shell
#!/bin/sh
node jslint.mjs hello.js

# stderr:
# jslint hello.js
# 1 Undeclared 'console'. // line 1, column 1
#     console.log('hello world');
# 2 Use double quotes, not single quotes. // line 1, column 14
#     console.log('hello world');
```

3. To load `jslint.mjs` as es-module:
```javascript
/*jslint devel*/
import jslint from "./jslint.mjs";
let code = "console.log('hello world');\n";
let result = jslint(code);
result.warnings.forEach(function ({
    formatted_message
}) {
    console.error(formatted_message);
});

// stderr:
// 1 Undeclared 'console'. // line 1, column 1
//     console.log('hello world');
// 2 Use double quotes, not single quotes. // line 1, column 14
//     console.log('hello world');
```

# Description
- [jslint.js](jslint.js) contains the jslint function. It parses and analyzes a source file, returning an object with information about the file. It can also take an object that sets options.

- [index.html](index.html) runs the jslint.js function in a web page. The page also depends on `browser.js`.

- [browser.js](browser.js) runs the web user interface and generates the results reports in HTML.

- [help.html](help.html) describes JSLint's usage. Please [read it](https://jslint-org.github.io/jslint/help.html).

- [function.html](function.html) describes the jslint function and the results it produces.

JSLint can be run anywhere that JavaScript (or Java) can run.

The place to express yourself in programming is in the quality of your ideas and
the efficiency of their execution. The role of style in programming is the same
as in literature: It makes for better reading. A great writer doesn't express
herself by putting the spaces before her commas instead of after, or by putting
extra spaces inside her parentheses. A great writer will slavishly conform to
some rules of style, and that in no way constrains her power to express herself
creatively. See for example William Strunk's The Elements of Style
[https://www.crockford.com/style.html].

This applies to programming as well. Conforming to a consistent style improves
readability, and frees you to express yourself in ways that matter. JSLint here
plays the part of a stern but benevolent editor, helping you to get the style
right so that you can focus your creative energy where it is most needed.

# Changelog
- [Full CHANGELOG.md](CHANGELOG.md)

## Todo
- app - deploy jslint as chrome-extension.
- ci - continue addng regression tests and improve code-coverage.
- doc - add svg package-listing.
- jslint - add html and css linting back into jslint.
- jslint - cleanup regexp code using switch-statements.
- node - after node-v12 is deprecated, change require("fs").promises to require("fs/promises").
- node - after node-v14 is deprecated, remove shell-code export "NODE_OPTIONS=--unhandled-rejections=strict".
- none

## v2021.5.28-beta
- bugfix - fix #282 - fail to warn trailing semicolon in `export default Object.freeze({})`.
- ci - auto-update changelog in README.md from CHANGELOG.md.
- ci - auto-update version numbers in README.md and jslint.js from CHANGELOG.md.
- website - replace links `branch.xxx` with `branch-xxx`.
- deadcode - replace with assertion-check in function do_function() - "if (mega_mode) { warn... }".
- jslint - inline function `activate` into function `action_var`.
- jslint - inline-document each deadcode-removal/assertion-check.
- jslint - inline-document each warning with cause that can reproduce it - part 2.

## v2021.5.27
- ci - fix expectedWarningCode not being validated.
- ci - in windows, disable git-autocrlf.
- deadcode - replace with assertion-check in function are_similar() - "if (a === b) { return true }".
- deadcode - replace with assertion-check in function are_similar() superseded by id-check - "if (Array.isArray(b)) { return false; }".
- deadcode - replace with assertion-check in function are_similar() superseded by is_weird() check - "if (a.arity === "function" && a.arity ===...c".
- jslint - add directive `test_internal_error`.
- jslint - add directive `unordered` to tolerate unordered properties and params.
- jslint - inline-document each warning with cause that can reproduce it - part 1.
- style - refactor code moving infix-operators from post-position to pre-position in multiline statements.
- website - add hotkey ctrl-enter to run jslint.

# End
