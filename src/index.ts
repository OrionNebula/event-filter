import { EventEmitter } from 'events'

declare module 'events' {
  interface EventEmitter {
    /**
     * Invoke a listener only when a certain condition is satisfied.
     * @param {string | symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onWhen (event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): void

    /**
     * Invoke a listener the first time a certain condition is satisfied.
     * @param {string | symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onceWhen (event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): void
  }
}

EventEmitter.prototype.onWhen = function (event, predicate, listener) {
  let th: EventEmitter = this
  th.on(event, function () {
    let args = Array.from(arguments)
    if (predicate(...args)) listener(...args)
  })
}

EventEmitter.prototype.onceWhen = function (event, predicate, listener) {
  let th: EventEmitter = this
  th.once(event, function () {
    let args = Array.from(arguments)
    if (predicate(...args)) listener(...args)
    else this.onceWhen(event, predicate, listener)
  })
}
