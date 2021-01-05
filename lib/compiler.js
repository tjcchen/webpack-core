'use strict';

const { getAST, getDependencies, transform } = require("./parser");
const path = require('path');;
const fs = require('fs');

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;

    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  /**
   * Entry point method run()
   */
  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);

    // recursively build dependency modules
    this.modules.map((module) => {
      module.dependencies.map(
        dependency => {
          this.modules.push(this.buildModule(dependency));
        }
      );
    });

    // generate output files
    this.emitFiles();
  }

  /**
   * Build modules
   */
  buildModule(filename, isEntry) {
    let ast;

    if (isEntry) {
      ast = getAST(filename);
    } else {
      const absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath);
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      transformedCode: transform(ast)
    };
  }

  /**
   * Generate output files
   */
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';

    // construct an object group with filename as its key, and source code wrapping inside a function as its value 
    this.modules.map((module) => {
      modules += `'${ module.filename }': function(require, module, exports) { ${module.transformedCode} },`;
    });

    // module wrapper
    const bundle = `
      (function(modules) {
        function require(filename) {
          const fn = modules[filename];
          const module = {
            exports: {}
          };

          fn.call(module.exports, require, module, module.exports);

          return module.exports;
        }

        require('${ this.entry }');
      })({ ${ modules } });
    `;

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
};