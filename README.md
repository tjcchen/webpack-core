## Webpack Core
A project used to elaborate on the core concept of webpack! In this repo, we are focusing on webpack version v4.*

## Webpack Mechanism
Webpack & Webpack-cli

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

By doing so, webpack plugins build connections with Tapable, both Compiler and Compilation inherit from Tapable.

Note: For more information about Tapable module, please also refer to [Tapable](https://github.com/webpack/tapable).

## Webpack Compiler and Compilation
Compiler and Compilation

## Contact
Email: tjcchen.engineer@gmail.com

## License
This project is licensed under the terms of the MIT license.
