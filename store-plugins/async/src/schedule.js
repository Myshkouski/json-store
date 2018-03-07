const PENDING = Symbol('PENDING')

export default class Schedule {
  constructor() {
    this[PENDING] = Promise.resolve()
  }

  immediate(task) {
    const p = Promise.all([
      this[PENDING],
      Promise.resolve(task())
    ])

    return p
  }

  deferred(task) {
    const p = this[PENDING].then(r => task())

    return p
  }
}
