import '.'

import { expect } from 'chai'
import { EventEmitter } from 'events'

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
})
