import { expect } from 'chai'
import { EventEmitter } from 'events'

import { onceWhen, onWhen } from '.'

describe('onWhen', () => {
  it('should only fire when the condition is satisfied', () => {
    const emitter = new EventEmitter()
    let hitCount = 0
    emitter.onWhen('test', (data: boolean) => data, (data: boolean) => {
      hitCount++
    })
    emitter.emit('test', false)
    emitter.emit('test', true)
    emitter.emit('test', true)
    emitter.removeAllListeners()
    expect(hitCount).to.equal(2)
  })

  it('should also succeed on EventLike objects', () => {
    const emitter: TestEmitter = new EventEmitter()
    let hitCount = 0
    onWhen(emitter, 'test', (data: boolean) => data, () => {
      hitCount++
    })
    emitter.emit('test', false)
    emitter.emit('test', true)
    emitter.emit('test', true)
    emitter.removeAllListeners()
    expect(hitCount).to.equal(2)
  })
})

describe('onceWhen', () => {
  it('should only fire once when the condition is satisfied', () => {
    const emitter = new EventEmitter()
    let hitCount = 0
    emitter.onceWhen('test', (data: boolean) => data, (data: boolean) => {
      hitCount++
    })
    emitter.emit('test', false)
    emitter.emit('test', true)
    emitter.emit('test', true)
    emitter.removeAllListeners()
    expect(hitCount).to.equal(1)
  })

  it('should also succeed on EventLike objects', () => {
    const emitter: TestEmitter = new EventEmitter()
    let hitCount = 0
    onceWhen(emitter, 'test', (data: boolean) => data, () => {
      hitCount++
    })
    emitter.emit('test', false)
    emitter.emit('test', true)
    emitter.emit('test', true)
    emitter.removeAllListeners()
    expect(hitCount).to.equal(1)
  })
})

interface TestEmitter {
  on (event: 'test', listener: (data: boolean) => void): this
  removeListener (event: 'test', listener: (data: boolean) => void): this
  emit (event: 'test', data: boolean): boolean
  removeAllListeners (event?: 'test'): void
}
