const Compiler = require('./compiler');
const options  = require('../webpack.simple'); // simple webpack config options

new Compiler(options).run();