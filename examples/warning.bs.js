'use strict';

var BsBox = require("../src/BsBox.bs.js");
var $$String = require("bs-platform/lib/js/string.js");

var code = "\n  let x =\n    match 0 with 0 -> ()\n";

var result = BsBox.compile(code);

if (result.tag) {
  console.log("Error: ", result[0][1][/* message */0]);
} else {
  var match = result[0];
  var warnings = match[/* warnings */1];
  if ($$String.trim(warnings) !== "") {
    console.log("Warnings:\n", warnings);
  }
  eval(match[/* code */0]);
}

exports.code = code;
exports.result = result;
/* result Not a pure module */
