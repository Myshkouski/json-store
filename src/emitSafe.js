export default function emitSafe(...args) {
  process.nextTick(() => this.emit(...args))

  return Promise.resolve()
}
