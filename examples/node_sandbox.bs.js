'use strict';

var Fs = require("fs");
var Vm = require("vm");
var BsBox = require("../src/BsBox.bs.js");
var $$String = require("bs-platform/lib/js/string.js");

var code = "\n  let hello thing =\n    Js.log {j|Hello $thing!|j}\n\n  let () =\n    hello (String.capitalize \"world\")\n";

var result = BsBox.compile(code);

if (result.tag) {
  console.log("Error: ", result[0][1][/* message */0]);
} else {
  var match = result[0];
  var warnings = match[/* warnings */1];
  if ($$String.trim(warnings) !== "") {
    console.log("Warnings:\n", warnings);
  }
  var context = Vm.createContext(({ console: console, exports: {} }));
  var stdlib = Fs.readFileSync("vendor/stdlibBundle.js", "utf8");
  Vm.runInContext(stdlib, context);
  Vm.runInContext(match[/* code */0], context);
  console.log("\nPost-evaluation context:");
  console.log(context);
}

exports.code = code;
exports.result = result;
/* result Not a pure module */
