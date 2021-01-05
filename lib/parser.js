/**
 * 1. Convert ES6 syntax to AST(Abstract Syntax Tree)
 * 2. Convert AST to JavaScript source code
 */

const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
  /**
   * Generate AST from ES6 source code
   * 
   * @param {String} path js file path
   */
  getAST: (path) => {
    const source = fs.readFileSync(path, 'utf-8');
    return babylon.parse(
      source,
      {
        sourceType: 'module'
      }
    );
  },

  /**
   * Retrieve import dependencies from AST
   * 
   * @param {Object} ast 
   */
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });
    return dependencies;
  },

  /**
   * Transform ES6 source code to ES5 mode
   * 
   * @param {Object} ast 
   */
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env'] // support es6 and es6 later new syntax
    });
    return code;
  }
};