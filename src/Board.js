import React, { Component } from 'react'
// import Square from './Square'


class Square {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.piece = null
  }
}

class Board extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   board: Array( 64 ).fill( null )
    // }
    this.state = {
      board: this.initializeBoard(),
      selected: null
    }
  }

  // initializeBoard = () => {
  //   return this.state.board.map( ( square, index ) =>
  //     <Square {...square} key={`square-${index}`} index={index}/> )
  // }

  initializeBoard = () => {
    let board = {}
    for (let y = 1; y <= 8; y++) {
      board[y] = {}
      for (let x = 1; x <= 8; x++) {
        board[y][x] = new Square(x, y)
      }
    }
    return board
  }


  render() {
    let boardRender = Object.values(this.state.board).reverse().map( (row, index) => {
      let rows = Object.values(row).map( square => {
        if (square.x + square.y % 2 ===1) {
          return <div key={square.x+square.y} className='white-square'>{'x:'+square.x+' '+'y:'+square.y}</div>

        } else {
          return <div key={square.x+square.y} className='black-square'>{'x:' + square.x+' '+'y:'+square.y}</div>
        }
      })
      return <div className='row' key={index}>{rows}</div>
    })

    return (
      <div className='board'>
        { boardRender }
      </div>
    )
  }
}

export default Board;
