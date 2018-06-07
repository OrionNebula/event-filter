# event-filter

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
<code>onWhen (event: string &#124; symbol, predicate: (...args: any[]) => boolean, listener (...args: any[]) => void): void</code>      |   Subscribe to the specified event, but only call the listener when the predicate is satisfied.
<code>onceWhen (event: string &#124; symbol, predicate: (...args: any[]) => boolean, listener (...args: any[]) => void): void</code>    |   Subscribe to the specified event, calling the listener the first time the predicate is satisfied.

`event-filter` contains defines TypeScript definitions for type safety.

`event-filter` adds JSDoc comments to both new methods.

## Building

To build, install all devDependencies and execute `npm run build`.

To build with a watch, execute `npm run watch:build`.

## Testing

To test, install all devDependencies and execute `npm run test`.