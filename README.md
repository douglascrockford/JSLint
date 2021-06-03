# JSLint, The JavaScript Code Quality Tool

Douglas Crockford
douglas@crockford.com

# Status
| Branch | [master<br>(v2021.5.30)](https://github.com/jslint-org/jslint/tree/master) | [beta<br>(Web Demo)](https://github.com/jslint-org/jslint/tree/beta) | [alpha<br>(Development)](https://github.com/jslint-org/jslint/tree/alpha) |
|--:|:--:|:--:|:--:|
| CI | [![ci](https://github.com/jslint-org/jslint/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/jslint-org/jslint/actions?query=branch%3Amaster) | [![ci](https://github.com/jslint-org/jslint/actions/workflows/ci.yml/badge.svg?branch=beta)](https://github.com/jslint-org/jslint/actions?query=branch%3Abeta) | [![ci](https://github.com/jslint-org/jslint/actions/workflows/ci.yml/badge.svg?branch=alpha)](https://github.com/jslint-org/jslint/actions?query=branch%3Aalpha) |
| Coverage | [![coverage](https://jslint-org.github.io/jslint/branch-master/.build/coverage/coverage-badge.svg)](https://jslint-org.github.io/jslint/branch-master/.build/coverage/index.html) | [![coverage](https://jslint-org.github.io/jslint/branch-beta/.build/coverage/coverage-badge.svg)](https://jslint-org.github.io/jslint/branch-beta/.build/coverage/index.html) | [![coverage](https://jslint-org.github.io/jslint/branch-alpha/.build/coverage/coverage-badge.svg)](https://jslint-org.github.io/jslint/branch-alpha/.build/coverage/index.html) |
| Demo | [<img src="image-window-maximize-regular.svg" height="30">](https://jslint-org.github.io/jslint/branch-master/index.html) | [<img src="image-window-maximize-regular.svg" height="30">](https://jslint-org.github.io/jslint/branch-beta/index.html) | [<img src="image-window-maximize-regular.svg" height="30">](https://jslint-org.github.io/jslint/branch-alpha/index.html) |
| Artifacts | [<img src="image-folder-open-solid.svg" height="30">](https://github.com/jslint-org/jslint/tree/gh-pages/branch-master/.build) | [<img src="image-folder-open-solid.svg" height="30">](https://github.com/jslint-org/jslint/tree/gh-pages/branch-beta/.build) | [<img src="image-folder-open-solid.svg" height="30">](https://github.com/jslint-org/jslint/tree/gh-pages/branch-alpha/.build) |

# Web Demo
- https://www.jslint.com/

[![screenshot](https://jslint-org.github.io/jslint/branch-beta/.build/screenshot-browser-_2fjslint_2fbranch-beta_2findex.html.png)](https://jslint-org.github.io/jslint/index.html)

# Install
### 1. To install, just download and rename https://www.jslint.com/jslint.js to `jslint.mjs`:
```shell
#!/bin/sh
curl -L https://www.jslint.com/jslint.js > jslint.mjs
```

### 2. To run `jslint.mjs` from command-line:
```shell
#!/bin/sh
node jslint.mjs hello.js

# stderr:
#
# jslint hello.js
# 1 Undeclared 'console'. // line 1, column 1
#     console.log('hello world');
# 2 Use double quotes, not single quotes. // line 1, column 14
#     console.log('hello world');
```

### 3. To load `jslint.mjs` as es-module:
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
//
// 1 Undeclared 'console'. // line 1, column 1
//     console.log('hello world');
// 2 Use double quotes, not single quotes. // line 1, column 14
//     console.log('hello world');
```

### 4. To jslint entire directory:
```shell
#!/bin/sh
node jslint.mjs .

# stderr:
#
# jslint - 20ms - ./CHANGELOG.md
# jslint - 20ms - ./README.md
# jslint - 20ms - ./browser.js
# jslint - 20ms - ./function.html
# jslint - 20ms - ./image-jslint.html
# jslint - 20ms - ./index.html
# jslint - 20ms - ./package.json
# jslint - 20ms - ./test.js
# jslint - 50ms - ./ci.sh
# jslint - 50ms - ./help.html
# jslint - 150ms - ./jslint.mjs
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

# Files
![screenshot-files.svg](https://jslint-org.github.io/jslint/branch-beta/.build/screenshot-files.svg)

# Changelog
- [Full CHANGELOG.md](CHANGELOG.md)

![screenshot-changelog.svg](https://jslint-org.github.io/jslint/branch-beta/.build/screenshot-changelog.svg)
