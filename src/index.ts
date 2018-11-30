import { EventEmitter } from 'events'

declare module 'events' {
  interface EventEmitter {
    /**
     * Invoke a listener only when a certain condition is satisfied.
     * @param {string | symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onWhen<TEvent extends string | symbol, TArgs extends any[], TListener extends EventLike<TEvent, TArgs>> (this: TListener, event: TEvent, predicate: (...args: TArgs) => boolean, listener: (...args: TArgs) => void): this

    /**
     * Invoke a listener the first time a certain condition is satisfied.
     * @param {string | symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onceWhen<TEvent extends string | symbol, TArgs extends any[], TListener extends EventLike<TEvent, TArgs>> (this: TListener, event: TEvent, predicate: (...args: TArgs) => boolean, listener: (...args: TArgs) => void): this
  }
}

EventEmitter.prototype.onWhen = function (this: EventEmitter, event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): EventEmitter {
  return onWhen(this, event, predicate, listener)
} as typeof EventEmitter.prototype.onWhen

EventEmitter.prototype.onceWhen = function (this: EventEmitter, event: string | symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): EventEmitter {
  return onceWhen(this, event, predicate, listener)
} as typeof EventEmitter.prototype.onceWhen

/**
 * An object that looks like EventEmitter, but doesn't inherit from it.
 */
interface EventLike<TEvent extends string | symbol, TArgs extends any[]> {
  on (event: TEvent, listener: (...args: TArgs) => void): this
  removeListener (event: TEvent, listener: (...args: TArgs) => void): this
}

/**
 * Invoke a listener only when a certain condition is satisfied.
 * @param {EventLike} evt The EventLike object to listen on.
 * @param {string | symbol} event The name of the event to listen to.
 * @param {(...any) => boolean} predicate A function which validates the event data.
 * @param {(...any) => void} listener A listener to the event.
 */
export function onWhen<TEvent extends string | symbol, TArgs extends any[], TListener extends EventLike<TEvent, TArgs>> (evt: TListener, event: TEvent, predicate: (...args: TArgs) => boolean, listener: (...args: TArgs) => void): TListener {
  return evt.on(event, (...args: TArgs) => {
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
export function onceWhen<TEvent extends string | symbol, TArgs extends any[], TListener extends EventLike<TEvent, TArgs>> (evt: TListener, event: TEvent, predicate: (...args: TArgs) => boolean, listener: (...args: TArgs) => void): TListener {
  return evt.on(event, onceHandler)

  function onceHandler (...args: TArgs) {
    if (!predicate(...args)) return

    try {
      listener(...args)
    } finally {
      evt.removeListener(event, onceHandler)
    }
  }
}
