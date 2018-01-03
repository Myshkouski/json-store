import * as symbols from '@alexeimyshkouski/store/dist/symbols'

import PersistedStore from '@alexeimyshkouski/store-persist-plugin'
import JsonStore from '@alexeimyshkouski/store-json-plugin'

export default Store => {
  Store.use( PersistedStore )
  Store.use( JsonStore )

  if ( typeof process !== 'undefined' &&
    (
      process.SERVER_BUILD ||
      ( process.env && process.env.VUE_ENV == 'server' )
    )
  ) {
    return
  }

  return {
    load() {
      if ( this[ symbols.STATE ].type == 'cookie' ) {
        this.clear( document.cookie.split( ';' )
          .reduce( ( state, pair ) => {
            if ( pair ) {
              const split = pair.split( '=' )
              state[ split[ 0 ] ] = split[ 1 ]
            }
            return state
          }, {} ) )
      }
    },

    save() {
      if ( this[ symbols.STATE ].type == 'cookie' ) {
        let cookie = []
        for ( let key in this[ symbols.STORE ] ) {
          cookie.push( key + '=' + this[ symbols.STORE ][ key ] )
        }
        document.cookie = cookie.join( ';' )
      }
    }
  }
}
