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
    init( options ) {
      const type = this[ symbols.STATE ].type

      if ( type == 'local' ) {
        this[ symbols.STATE ].storage = window.localStorage
      } else if ( type == 'session' ) {
        this[ symbols.STATE ].storage = window.sessionStorage
      } else {
        throw new Error( 'Unknown storage type:', type )
      }
    },

    load() {
      if ( this[ symbols.STATE ].type == 'local' ) {
        this.clear()

        for ( let i = 0; i < window.localStorage.length; i++ ) {
          const key = window.localStorage.key( i )
          const value = window.localStorage.getItem( key )
          this[ symbols.STORE ][ key ] = JSON.parse( value )
        }
      }
    },

    save() {
      if ( this[ symbols.STATE ].type == 'local' ) {
        for ( let key in this[ symbols.STORE ] ) {
          window.localStorage.setItem( key, JSON.stringify( this[ symbols.STORE ][ key ] ) )
        }
      }
    }
  }
}
