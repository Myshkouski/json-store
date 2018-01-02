import * as symbols from '@alexeimyshkouski/store/symbols'
import Schedule from './schedule'

export default () => {
  return {
    init() {
      if ( !this[ symbols.STATE ].schedule ) {
        this[ symbols.STATE ].schedule = new Schedule()
      }
    }
  }
}
