"use strict"

import React, { Component } from 'react'

import PromptPlayerPlugin from './prompt-player-plugin'
import { bindRender } from 'content-presenter'

class PromptReactComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
    this.props.player && this.props.player.on('onLoaded', data => {
      this.setState({ data: data.data })
    })
  }
  render() {
    const data = this.state.data
    if (!data) { return null }
    return (
      <div id = "quiz-player" className="embed-player">
        <div className="w3-panel w3-border w3-light-grey w3-round-large" style={{margin: 'auto', padding: '32px 0', textAlign: 'center'}}>
          <div className="w3-large w3-text-blue-grey" style={{margin: '0 0 32px 0'}}> {data.prompt} </div>
          <div>{
            data.buttons.map(btn => (
              <button key={btn.label} className="w3-button" onClick={e => this.finish(btn.action) } > {btn.label} </button>
            ))
          }</div>
        </div>
      </div>
    )
  }
  finish(next) {
    this.props.player.finish && this.props.player.finish(next)
  }
}

export default bindRender(PromptPlayerPlugin, PromptReactComponent)
