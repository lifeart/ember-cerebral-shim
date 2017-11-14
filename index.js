/* jshint node: true */
'use strict';
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const replace = require('broccoli-replace');
const Funnel = require('broccoli-funnel');
module.exports = {
  name: 'cerebral',
  isDevelopingAddon() {
    return true;
  },
  _findHost: function () {
    var current = this;
    var app;

    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
      app = current.app || app
    } while (current && current.parent && current.parent.parent && (current = current.parent))

      return app;
  },
  treeForAddon (tree) {
    const app = this._findHost();
    const reduxPath = path.dirname(require.resolve('cerebral/es/index.js'));
    let reduxTree = new Funnel(reduxPath,{
      exclude: ['**/*.test.js']
    });
    reduxTree = replace(reduxTree, {
      files: ['**/*.js','**/**/*.js'],
      patterns: [
        {
          match: /process\.env\.NODE_ENV/g,
          replacement: `"${app.env}"`
        },
        {
          match: /VERSION/g,
          replacement: `"3.4.0"`
        },
      ]
    });

    if (!tree) {
      return this._super.treeForAddon.call(this, reduxTree);
    }

    const trees = mergeTrees([tree,reduxTree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
}