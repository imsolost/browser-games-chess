import React, { Component } from 'react'
import Square from './Square'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: Array( 64 ).fill( null )
    }
  }

  render() {
    return (
      <div className='board'>
        { this.state.board.map( ( square, index ) =>
          <Square {...square} key={`square-${index}`} index={index} /> )}
      </div>
    )
  }
}

export default Board;
