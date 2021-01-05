/**
 * This file is to test parser relevant functionalities. A simple AST tree looks like this:
 * 
 * Node {
 *   type: 'File',
 *   start: 0,
 *   end: 73,
 *   loc: SourceLocation {
 *     start: Position { line: 1, column: 0 },
 *     end: Position { line: 3, column: 37 }
 *   },
 *  program: Node {
 *    type: 'Program',
 *    start: 0,
 *    end: 73,
 *    loc: SourceLocation { start: [Position], end: [Position] },
 *    sourceType: 'module',
 *    body: [ [Node], [Node] ],
 *    directives: []
 *  },
 *  comments: [],
 *  tokens: [
 *    Token {
 *      type: [KeywordTokenType],
 *      value: 'import',
 *      start: 0,
 *      end: 6,
 *      loc: [SourceLocation]
 *    },
 *    Token {
 *      type: [TokenType],
 *      value: 'greeting',
 *      start: 7,
 *      end: 15,
 *      loc: [SourceLocation]
 *    },
 *  ]
 * }
 * 
 */

const { getAST, getDependencies, transform } = require('./parser.js');
const path = require('path');

// retrieve ast tree from specified file path
const ast = getAST(path.join(__dirname, '../src/index.js'));

// find import dependencies
const dependencies = getDependencies(ast);
// console.log(dependencies); // [ './greeting' ]

// transform ast code es5 code
const es5Code = transform(ast);
console.log(es5Code);
