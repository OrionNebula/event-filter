# event-filter

[![npm](https://img.shields.io/npm/v/event-filter.svg)](https://npmjs.org/package/event-filter)
[![npm](https://img.shields.io/npm/dm/event-filter.svg)](https://npmjs.org/package/event-filter)
[![npm type definitions](https://img.shields.io/npm/types/event-filter.svg)](https://npmjs.org/package/event-filter)
[![GitHub last commit](https://img.shields.io/github/last-commit/OrionNebula/event-filter.svg)](https://github.com/OrionNebula/event-filter)
[![Build Status](https://travis-ci.org/OrionNebula/event-filter.svg?branch=master)](https://travis-ci.org/OrionNebula/event-filter)

A package for filtering Node.js events. Your listeners only get executed when the specified predicate is satisfied.

## Usage

```js
import { EventEmitter } from 'event'
import 'event-filter'

const event = new EventEmitter()
event.onWhen('someEvent', (...) => /* predicate */, (...) => /* normal listener */)
event.onceWhen('someEvent', (...) => /* predicate */, (...) => /* normal listener */)
```

`event-filter` adds the following methods to the `EventEmitter` prototype:

Method Name |   Description
----------- |   -----------
<code>onWhen (event: string &#124; symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): this</code>      |   Subscribe to the specified event, but only call the listener when the predicate is satisfied.
<code>onceWhen (event: string &#124; symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): this</code>    |   Subscribe to the specified event, calling the listener the first time the predicate is satisfied.

`event-filter` also exports the following methods:

Method Name |   Description
----------- |   -----------
<code>onWhen&lt;TEvent extends EventLike&gt; (evt: EventLike, event: string &#124; symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): TEvent</code> | Subscribe to the specified event, but only call the listener when the predicate is satisfied.
<code>onceWhen&lt;TEvent extends EventLike&gt; (evt: EventLike, event: string &#124; symbol, predicate: (...args: any[]) => boolean, listener: (...args: any[]) => void): TEvent</code> | Subscribe to the specified event, calling the listener the first time the predicate is satisfied.

Using these allows you to call `onWhen` and `onceWhen` on objects that are like `EventEmitter`, but don't actually extend the superclass.

`event-filter` contains defines TypeScript definitions for type safety.

`event-filter` adds JSDoc comments to both new methods.

## Building

To build, install all devDependencies and execute `npm run build`.

To build with a watch, execute `npm run watch:build`.

## Testing

To test, install all devDependencies and execute `npm run test`.