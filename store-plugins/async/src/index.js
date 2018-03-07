import Store from '@alexeimyshkouski/store'
import Schedule from './schedule'

export default () => {
  return {
    init() {
      if (!this[Store.symbols.STATE].schedule) {
        this[Store.symbols.STATE].schedule = new Schedule()
      }
    }
  }
}
