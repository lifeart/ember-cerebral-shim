module.exports = {
  desctipion: 'Cerebral shim for Ember.js',
  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'cerebral', target: '^3.4.0'}
    ]).then(() => {
      return this.addAddonsToProject({
        packages: [
          {name: 'ember-function-tree-shim', target: '*'},
          {name: 'ember-eventemitter3-shim', target: '*'}
        ]
      })
    })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}