## Webpack Core
A project used to elaborate the core concept of webpack! In this repo, we are focusing on webpack version v4.*

## Webpack Mechanism
Webpack & Webpack-cli

Wepack will find whether a user have webpack-cli or webpack-command package installed. If not, the command line would prompt the user to install it. Webpack, then, would execute the webpack-cli module.

Webpack-cli will do two things in the build process as follows:
- Convert configuration file arguments or command line arguments to webpack options.
- Apply these webpack options to instantiate webpack object, and then execute the build process.

## Tapable and Webpack Plugin Mechanism
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

Webpack compiler invokes plugin functionality inside its own code logic:
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

## A Simple Webpack Implementation
In this repo, we also implment a very simple webpack module bundler. Several NPM modules are very import in the whole building process.
1. [babylon](https://github.com/babel/babylon) module, currently known as [@babel/parser](https://github.com/babel/babel/tree/master/packages/babel-parser), is used to convert es6 new syntax to AST(Abstract Syntax Tree) tree structure.
2. [babel-traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse) module, currently known as [@babel/traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse), is used to analyze the module dependencies( namely import module ) in es6 code.
3. `transformFromAst` method coming from [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core), currently known as [@babel/core](https://github.com/babel/babel/tree/master/packages/babel-core), is used to transform AST tree stucture to es5 code.

Finally, we need to put the generated code into a module wrapper. A simple wrapper looks like the code [here](https://github.com/tjcchen/webpack-core/blob/main/webpack.module.js).

## Contact
Email: tjcchen.engineer@gmail.com

## License
This project is licensed under the terms of the MIT license.
