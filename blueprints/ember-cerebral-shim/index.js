module.exports = {
  desctipion: 'Cerebral shim for Ember.js',
  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'cerebral', target: '^3.4.0'},
      {name: 'download-git-repo', target: '^1.0.1'}
    ]).then(() => {
      return this.addAddonsToProject({
        packages: [
          {name: 'ember-function-tree-shim', target: '*'},
          {name: 'ember-eventemitter3-shim', target: '*'}
        ]
      })
    }).then(()=>{
      return new Promise(function(resolve, reject){
        const download = require('download-git-repo');
        download('cerebral/cerebral', 'cerebral_src', function (err) {
          console.log(err ? 'Error' : 'Success');
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      });
    });
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
}