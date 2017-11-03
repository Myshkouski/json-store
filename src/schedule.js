const PENDING = Symbol('PENDING')

class Schedule {
  constructor() {
    this[PENDING] = Promise.resolve()
  }

  immediate(task) {
    const p = Promise.all([
      this[PENDING],
      Promise.resolve(task())
    ])

    this[PENDING] = p.catch(err => {})

    return p
  }

  deferred(task) {
    const p = this[PENDING].then(r => task())
    this[PENDING] = p.catch(err => {})

    return p
  }
}

export default Schedule
