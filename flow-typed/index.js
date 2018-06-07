// @flow

declare module 'events' {
  declare class EventEmitter {
    /**
     * Invoke a listener only when a certain condition is satisfied.
     * @param {string | Symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onWhen (event: string | Symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): void;

    /**
     * Invoke a listener the first time a certain condition is satisfied.
     * @param {string | Symbol} event The name of the event to listen to.
     * @param {(...any) => boolean} predicate A function which validates the event data.
     * @param {(...any) => void} listener A listener to the event.
     */
    onceWhen (event: string | Symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): void;
  }
}
