import jsonPointer from 'json-pointer'

import * as symbols from '@alexeimyshkouski/store/symbols'
import applyHooks from '@alexeimyshkouski/store/applyHooks'

export default Store => {
  Object.assign( Store.prototype, {
    set( path, value ) {
      jsonPointer.set( this[ symbols.STORE ], path, value )

      applyHooks.call( this, Store, [ 'save' ] )

      return this
    },

    remove( path ) {
      jsonPointer.remove( this[ symbols.STORE ], path )

      applyHooks.call( this, Store, [ 'save' ] )

      return this
    },

    get( path ) {
      if ( this.has( path ) ) {
        return jsonPointer.get( this[ symbols.STORE ], path )
      }
    },

    has( path ) {
      return jsonPointer.has( this[ symbols.STORE ], path )
    },

    clear( state ) {
      if ( !state instanceof Object ) {
        throw TypeError( 'JsonStore must use Object as internal state, passed', typeof Object )
      }
      this[ symbols.STORE ] = state || {}
      applyHooks.call( this, Store, [ 'clear' ] )
      return this
    }
  } )

  return {
    init() {
      this[ symbols.STORE ] = {}
    }
  }
}
