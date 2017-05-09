import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: this.initializeBoard(),
      selected: {}
    }
  }

  initializeBoard = () => {
    let board = {}
    for ( let y = 1; y <= 8; y++ ) {
      board[y] = {}
      for ( let x = 1; x <= 8; x++ ) {
        board[y][x] = new Square(x, y)
      }
    }
    return board
  }

  handleClick = (x, y) => {
    this.setState({ selected: {x: x, y: y} })
  }

  render() {
    console.log('selected square', this.state.selected.x, this.state.selected.y);

    let boardDisplay = Object.values( this.state.board ).reverse().map( ( row, index ) => {
      let rows = Object.values( row ).map( square => {
        if ( ( square.x + square.y ) % 2 === 1 ) {
          return <div
            key={square.x+square.y}
            className='white square'
            onClick={this.handleClick.bind(this, square.x, square.y)}></div>

        } else {
          return <div
            key={square.x+square.y}
            className='black square'
            onClick={this.handleClick.bind(this, square.x, square.y)}></div>
        }
      })
      return <div className='row' key={index}>{rows}</div>
    })

    return (
      <div className='board'>
        { boardDisplay }
      </div>
    )
  }
}
