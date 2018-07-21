import { EventEmitter } from 'events'

declare module 'events' {
  interface EventEmitter {
    /**
     * Invoke a listener only when a certain condition is satisfied.
     * @param {string | symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onWhen <TEvent extends string | symbol, TEmitter extends EventLike<TEvent>> (this: TEmitter, event: TEvent, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): this

    /**
     * Invoke a listener the first time a certain condition is satisfied.
     * @param {string | symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onceWhen <TEvent extends string | symbol, TEmitter extends EventLike<TEvent>> (this: TEmitter, event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): this
  }
}

EventEmitter.prototype.onWhen = function <TEvent extends string | symbol, TEmitter extends EventLike<TEvent>> (this: TEmitter, event: TEvent, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void) {
  return onWhen(this, event, predicate, listener)
} as typeof EventEmitter.prototype.onWhen

EventEmitter.prototype.onceWhen = function <TEvent extends string | symbol, TEmitter extends EventLike<TEvent>> (this: TEmitter, event: TEvent, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void) {
  return onceWhen(this, event, predicate, listener)
} as typeof EventEmitter.prototype.onceWhen

/**
 * An object that looks like EventEmitter, but doesn't inherit from it.
 */
interface EventLike<TEvent extends string | symbol> {
  on (event: TEvent, listener: (...args: any[]) => void): this
  removeListener (event: TEvent, listener: (...args: any[]) => void): this
}

/**
 * Invoke a listener only when a certain condition is satisfied.
 * @param {EventLike} evt The EventLike object to listen on.
 * @param {string | symbol} event The name of the event to listen to.
 * @param {(...any) => boolean} predicate A function which validates the event data.
 * @param {(...any) => void} listener A listener to the event.
 */
export function onWhen<TEvent extends string | symbol, TEmitter extends EventLike<TEvent>> (evt: TEmitter, event: TEvent, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): TEmitter {
  return evt.on(event, (...args: any[]) => {
    if (!predicate(...args)) return

    listener(...args)
  })
}

/**
 * Invoke a listener the first time a certain condition is satisfied.
 * @param {EventLike} evt The EventLike object to listen on.
 * @param {string | symbol} event The name of the event to listen for.
 * @param {(...any) => boolean} predicate A function which validates event data.
 * @param {(...any) => void} listener A listener to the event.
 */
export function onceWhen<TEvent extends string | symbol, TEmitter extends EventLike<TEvent>> (evt: TEmitter, event: TEvent, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): TEmitter {
  return evt.on(event, onceHandler)

  function onceHandler (...args: any[]) {
    if (!predicate(...args)) return

    listener(...args)
    evt.removeListener(event, onceHandler)
  }
}
