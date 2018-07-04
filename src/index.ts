import { EventEmitter } from 'events'

declare module 'events' {
  interface EventEmitter {
    /**
     * Invoke a listener only when a certain condition is satisfied.
     * @param {string | symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onWhen (event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): this

    /**
     * Invoke a listener the first time a certain condition is satisfied.
     * @param {string | symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onceWhen (event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): this
  }
}

EventEmitter.prototype.onWhen = function <TArgs extends any[]> (this: EventEmitter, event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void) {
  return onWhen(this, event, predicate, listener)
}

EventEmitter.prototype.onceWhen = function <TArgs extends any[]> (this: EventEmitter, event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void) {
  return onceWhen(this, event, predicate, listener)
}

interface EventLike {
  on (event: string | symbol, listener: (...args: any[]) => void): this
  removeListener (event: string | symbol, listener: (...args: any[]) => void): this
}

export function onWhen<TListener extends EventLike> (evt: TListener, event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): TListener {
  return evt.on(event, (...args: any[]) => {
    if (!predicate(...args)) return

    listener(...args)
  })
}

export function onceWhen<TListener extends EventLike> (evt: TListener, event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): TListener {
  return evt.on(event, onceHandler)

  function onceHandler (...args: any[]) {
    if (!predicate(...args)) return

    listener(...args)
    evt.removeListener(event, onceHandler)
  }
}
