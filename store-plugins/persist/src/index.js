import defaults from 'lodash.defaultsdeep'

import * as symbols from '@alexeimyshkouski/store/dist/symbols'
import applyHooks from '@alexeimyshkouski/store/dist/applyHooks'

import AsyncStore from '@alexeimyshkouski/store-async-plugin'

function _sync( Store, hook ) {
  this[ symbols.STATE ].schedule
    .deferred( () => {
      this[ symbols.STATE ].syncing = true
      applyHooks.call( this, Store, [ hook ] )
    } )

  this[ symbols.STATE ].schedule
    .deferred( () => {
      this[ symbols.STATE ].syncing = false
    } )

  return this[ symbols.STATE ].schedule.deferred( () => {} )
}

export default Store => {
  Store.use( AsyncStore )

  Object.assign( Store.prototype, {
    load() {
      return _sync.call( this, Store, 'load' )
    },

    save() {
      return _sync.call( this, Store, 'save' )
    },

    sync( task ) {
      return this[ symbols.STATE ].schedule.deferred( () => {} )
    }
  } )

  return {
    init( options ) {
      defaults( this[ symbols.STATE ], options, {
        sync: false,
        syncing: false,
        watcher: null
      } )

      if ( this[ symbols.STATE ].sync ) {
        this.load()
          .catch( err => console.error( err ) )
      }
    }
  }
}
