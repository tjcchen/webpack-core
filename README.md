# Webpack Core
A project used to elaborate the core concept of webpack! In this repo, we are focusing on webpack version 4.*

# Webpack v4 Mechanism
Webpack & Webpack-CLI

Wepack will find whether a user have webpack-cli or webpack-command package installed. If not, the command line would prompt the user to install it. Webpack, then, would execute the webpack-cli package.

Webpack-CLI will do two things in the build process as follows:
- Convert configuration file arguments or command line arguments to webpack options.
- Apply these webpack options to instantiate webpack object, and then execute the build process.

# Tapable and Webpack Plugin Mechanism
Tapable is similar to Node's EventEmitter module, which takes care of event subscription and publishing of Node, and it controls the plugin system of webpack. Tapable is capable of registering plugin and invoking plugin, the key code logic is buried within webpack.js:
```
new NodeEnvironmentPlugin().apply(compiler);
```

Webpack plugin registers its functionlity within apply function with Tapable hooks:
```
class SomeGreatPlugin {
  ...

  apply(compiler) {
    // bind event
    compiler.hooks.brake.tap('SomeGreatPlugin', () => { ... });
  }

  ...
}
```

Webpack compiler invokes plugin functionality inside its code logic:
```
module.exports = class Compiler {
  constructor() {
    this.hooks = {
      brake: new SyncHook()
    };
  }

  run() {
    this.brake();
  }

  brake() {
    // invoke event
    this.hooks.brake.call();
  }
}
```

By doing so, webpack plugins build connections with Tapable, both Compiler and Compilation inherit from Tapable.( We'll cover Compiler and Compilation soon )

Note: For more information about Tapable module, please also refer to [Tapable](https://github.com/webpack/tapable).

# Contact
Email: tjcchen.engineer@gmail.com

# License
This project is licensed under the terms of the MIT license.
