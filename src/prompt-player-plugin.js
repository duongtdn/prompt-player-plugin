"use strict"

export default class PromptPlayerPlugin {
  constructor(events) {

    this._events = {}
    for (let name in events) {
      this._events[name] = [events[name]]
    }

    this.timeout = false
    this.active = false

  }

  init() {
    console.log('Prompt Player init')
  }

  load(src) {
    this.active = true
    this._fire('onLoaded', { data: JSON.parse(src) })
    return this
  }

  stop() {
    this.active = false
    return this
  }

  finish(next) {
    this._fire('onFinished', next)
    this.stop()
    return this
  }

  on(event, handler) {
    this._events && this._events[event].push(handler)
  }

  _fire(event, ...args) {
    /* only fire event when active */
    if (this.active && this._events[event]) {
      this._events[event].forEach(handler => handler(...args) )
    }
    return this;
  }

}

PromptPlayerPlugin.playerName = 'PROMPT'
PromptPlayerPlugin.version = '1.0.0'
PromptPlayerPlugin.media = true

