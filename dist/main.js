
      (function(modules) {
        function require(filename) {
          const fn = modules[filename];
          const module = {
            exports: {}
          };

          fn.call(module.exports, require, module, module.exports);

          return module.exports;
        }

        require('/Users/chen/webpack-core/src/index.js');
      })({ '/Users/chen/webpack-core/src/index.js': function(require, module, exports) { "use strict";

var _greeting = require("./greeting.js");

var _greeting2 = _interopRequireDefault(_greeting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.write((0, _greeting2.default)('And Chen')); },'./greeting.js': function(require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = greeting;
function greeting(name) {
  return "Hello " + name + "!";
}; }, });
    