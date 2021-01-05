'use strict';

module.exports = class Compiler {
  constructor(opts) {
    const { entry, output } = opts;

    this.entry = entry;
    this.output = output;
  }

  /**
   * Entry point method run()
   */
  run() {

  }

  /**
   * Build modules
   */
  buildModule() {

  }

  /**
   * Generate output files
   */
  emitFiles() {

  }
};