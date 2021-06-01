/*jslint node*/
import fs from "fs";
import jslint from "./jslint.js";

function assertOrThrow(passed, msg) {
/*
 * this function will throw <msg> if <passed> is falsy
 */
    if (!passed) {
        throw new Error(msg);
    }
}

function noop() {
/*
 * this function will do nothing
 */
    return;
}

(function testCaseJslintCli() {
/*
 * this function will test jslint's cli handling-behavior
 */
    process.exit = function (exitCode) {
        assertOrThrow(!exitCode, exitCode);
    };
    jslint("", {
        cli_mode: true,
        file: "jslint.js"
    });
    jslint("", {
        cli_mode: true,
        // suppress error
        console_error: noop,
        file: "syntax_error.js",
        option: {
            debug: true
        },
        source: "syntax error"
    });
    jslint("", {
        cli_mode: true,
        file: "aa.html",
        source: "<script>\nlet aa = 0;\n</script>\n"
    });
}());

(function testCaseJslintMisc() {
/*
 * this function will test jslint's misc handling-behavior
 */
    // test assertOrThrow's throw handling-behavior
    try {
        assertOrThrow(undefined, new Error());
    } catch (ignore) {}
}());

(function testCaseJslintOption() {
/*
 * this function will test jslint's option handling-behavior
 */
    assertOrThrow(jslint("", {
        bitwise: true,
        browser: true,
        convert: true,
        couch: true,
        debug: true,
        devel: true,
        eval: true,
        for: true,
        getset: true,
        long: true,
        node: true,
        single: true,
        this: true,
        white: true
    }).warnings.length === 0);
    assertOrThrow(jslint("", {
        test_internal_error: true
    }).warnings.length === 1);
}());

(function testCaseJslintCodeValidate() {
/*
 * this function will validate each code is valid in jslint
 */
    Object.values({
        array: [
            "new Array(0);"
        ],
        async_await: [
            "async function aa() {\n    await aa();\n}"
        ],
        date: [
            "Date.getTime();",
            "let aa = aa().getTime();",
            "let aa = aa.aa().getTime();"
        ],
        directives: [
            "#!\n/*jslint browser:false, node*/\n\"use strict\";",
            "/*jslint bitwise*/\nlet aa = aa | 0;",
            "/*jslint browser*/\n;",
            "/*jslint debug*/\n",
            "/*jslint devel*/\ndebugger;",
            "/*jslint eval*/\nnew Function();\neval();",
            "/*jslint getset*/\nlet aa = {get aa() {\n    return;\n}};",
            "/*jslint getset*/\nlet aa = {set aa(aa) {\n    return aa;\n}};",
            "/*jslint this*/\nlet aa = this;",
            "/*jslint unordered*/\nlet {bb, aa} = 0;",
            "/*jslint white*/\n\t",
            "/*property aa bb*/"
        ],
        fart: [
            "function aa() {\n    return () => 0;\n}"
        ],
        jslint_disable: [
            "/*jslint-disable*/\n0\n/*jslint-enable*/"
        ],
        jslint_quiet: [
            "0 //jslint-quiet"
        ],
        json: [
            "{\"aa\":[[],-0,null]}"
        ],
        label: [
            "function aa() {\nbb:\n    while (true) {\n        if (true) {\n"
            + "            break bb;\n        }\n    }\n}"
        ],
        loop: [
            "function aa() {\n    do {\n        aa();\n    } while (aa());\n}"
        ],
        module: [
            "export default Object.freeze();",
            "import {aa, bb} from \"aa\";\naa(bb);",
            "import {} from \"aa\";",
            "import(\"aa\").then(function () {\n    return;\n});"
        ],
        number: [
            "let aa = 0.0e0;",
            "let aa = 0b0;",
            "let aa = 0o0;",
            "let aa = 0x0;"
        ],
        optional_chaining: [
            "let aa = aa?.bb?.cc;"
        ],
        property: [
            "let aa = aa[`!`];"
        ],
        regexp: [
            "function aa() {\n    return /./;\n}",
            "let aa = /(?!.)(?:.)(?=.)/;"
        ],
        ternary: [
            "let aa = (\n    aa()\n    ? 0\n    : 1\n) "
            + "&& (\n    aa()\n    ? 0\n    : 1\n);"
        ],
        try_catch: [
            "let aa = 0;\n"
            + "try {\n"
            + "    aa();\n"
            + "} catch (err) {\n"
            + "    aa = err;\n"
            + "}\n"
            + "try {\n"
            + "    aa();\n"
            + "} catch (err) {\n"
            + "    aa = err;\n"
            + "}\n"
            + "aa();\n"
        ],
        var: [
            "let [...aa] = [...aa];",
            "let [\n    aa, bb = 0\n] = 0;",
            "let {aa, bb} = 0;",
            "let {\n    aa: bb\n} = 0;"
        ]
    }).forEach(function (codeList) {
        codeList.forEach(function (code) {
            let warnings;
            warnings = jslint(code).warnings;
            assertOrThrow(
                warnings.length === 0,
                JSON.stringify([code, warnings])
            );
        });
    });
}());

(async function testCaseJslintWarningsValidate() {
/*
 * this function will validate each jslint <warning> is raised with given
 * malformed <code>
 */
    Array.from(String(
        await fs.promises.readFile("jslint.js", "utf8")
    ).matchAll(new RegExp((
        "\\s*?"
        + "(\\/\\/\\s*?cause:.*?\\n(?:\\/\\/.*?\\n)*?)"
        + "(\\s*?^[^\\/].*?(?:\\n\\s*?\".*?)?$)"
    ), "gm"))).forEach(function ([
        match0, causeList, warning
    ]) {
        let cause0;
        let expectedWarningCode;
        let fnc;
        // debug match0
        // console.error(match0.trim().replace((/\n\n/g), "\n"));
        assertOrThrow(
            match0.indexOf("\n\n" + causeList + "\n    ") === 0,
            JSON.stringify([
                match0, causeList
            ], undefined, 4)
        );
        warning = warning.match(
            "("
            + "at_margin"
            + "|expected_at"
            + "|left_check"
            + "|no_space_only"
            + "|one_space"
            + "|one_space_only"
            + "|semicolon"
            + "|stop"
            + "|stop_at"
            + "|warn"
            + "|warn_at"
            + ")"
            + "\\\u0028\\s*?\"?"
            + "(\\S[^\n\"]+)"
        );
        if (warning) {
            expectedWarningCode = warning[2];
            fnc = warning[1];
            switch (fnc) {
            case "at_margin":
            case "expected_at":
                expectedWarningCode = "expected_a_at_b_c";
                break;
            case "left_check":
                expectedWarningCode = "unexpected_a";
                break;
            case "no_space_only":
                expectedWarningCode = "unexpected_space_a_b";
                break;
            case "one_space":
            case "one_space_only":
                expectedWarningCode = "expected_space_a_b";
                break;
            case "semicolon":
                expectedWarningCode = "expected_a_b";
                break;
            }
        }
        cause0 = "";
        causeList.split(
            /\/\/\u0020cause:[\n|\u0020]/
        ).slice(1).forEach(function (cause) {
            assertOrThrow(cause === cause.trim() + "\n", JSON.stringify(cause));
            cause = (
                expectedWarningCode === "too_long"
                ? "//".repeat(100)
                : cause[0] === "\""
                ? JSON.parse(cause)
                : cause.replace((
                    /^\/\/\u0020/gm
                ), "")
            );
            // Assert causes are sorted.
            assertOrThrow(cause0 < cause, JSON.stringify([
                cause0, cause
            ], undefined, 4));
            cause0 = cause;
            // Assert expectedWarningCode from cause.
            assertOrThrow(
                jslint(cause).warnings.some(function ({
                    code
                }) {
                    return code === expectedWarningCode;
                }) || !expectedWarningCode,
                "\n" + cause.trim()
            );
        });
    });
}());
