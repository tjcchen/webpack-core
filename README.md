## Webpack Core
A project used to elaborate on the core concept of webpack! In this repo, we are focusing on webpack version v4.

## Webpack & Webpack-cli
Wepack will find whether a user has webpack-cli or webpack-command package installed. If not, the command line would prompt the user to install it. Webpack, then, would execute the webpack-cli module.

Webpack-cli will do two things in the build process as follows:
- Convert configuration file arguments or command line arguments to webpack options:
```js
let options = require("./utils/convert-argv")(argv);
```
- Apply these webpack options to instantiate webpack objects, and then execute the build process:
```js
function processOptions(options) {
  const webpack = require('webpack');

  let compiler = webpack(options);

  compiler.run((err, stats) => { ... }); // run build process
}

processOptions(options);
```

## Webpack Build Process
The whole build process of webpack contains several important hooks, which are mostly declared in Compiler.js and Compilation.js. These hooks control crucial time slots of the building lifecycle. Basically, they can be divided into three stages.
- Preparation Stage:  

Webpack utilizes `hooks.entryOption` hook, which is declared in `Compiler.js` and invoked in `WebpackOptionsApply.js`, to convert config options to webpack built-in plugins, and register all of these plugins to compiler object. 

- Build Process Stage:  

There are many import hooks take effect at this stage, including `hooks.run`(in Compiler.js), `hooks.make`(in Compiler), `hooks.beforeResolve`(in NormalModuleFactory and ContextModuleFactory), `hooks.buildModule`(in Compilation.js), `hooks.normalModuleLoader`(in Compilation.js), `hooks.program`(in Parser.js), these hooks resolve code dependencies and build modules, finally generate es5 code.  
  
Note: Webpack utilizes [acron](https://github.com/acornjs/acorn) to work as a parser - parsing es6 code to AST, and then transforming AST to es5 code, not [@babel/parser](https://github.com/babel/babel). Actually, `@babel/parser` was born as a fork of `acorn`, but it has been completely rewritten.

- Optimize and Emit Files Stage:  

Webpack finally optimizes the generated chunks inside `hooks.seal`(in Compilation.js) hook, and then generate output files inside `hooks.emit`(in Compiler.js) hook.

## Tapable and Webpack Plugin Mechanism
Tapable is similar to Node's EventEmitter module, which takes care of event subscription and publishing of Node, and it controls the plugin system of webpack. Tapable is capable of registering plugin and invoking plugin, the key code logic is buried within webpack.js:
```js
new NodeEnvironmentPlugin().apply(compiler);
```

Webpack plugin registers its functionality within `apply` function with Tapable hooks:
```js
class SomeGreatPlugin {
  ...
  apply(compiler) {
    compiler.hooks.compile.tap('SomeGreatPlugin', () => { ... }); // bind event
  }
  ...
}
```

Webpack compiler invokes plugin functionality inside its own code logic:
```js
module.exports = class Compiler {
  constructor() {
    this.hooks = {
      compile: new SyncHook(["params"])
    };
  }

  run() {
    this.compile();
  }

  compile() {
    this.hooks.compile.call(); // invoke event
  }
}
```

By doing so, webpack plugins build connections with Compiler and Compilation, both Compiler and Compilation inherit from Tapable.

Note: For more information about Tapable module, please also refer to [Tapable](https://github.com/webpack/tapable).

## Contact
Email: tjcchen.engineer@gmail.com

## License
This project is licensed under the terms of the MIT license.
