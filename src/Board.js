import React, { Component } from 'react'
import { Square, Pawn, Rook, Knight, Bishop, Queen, King } from './Pieces'

export default class Board extends Component {
  constructor() {
    super()
    this.state = {
      board: this.setupBoard(),
      selected: null,
      nextPlayer: 'white'
    }
    this.setupPieces()
    sessionStorage.setItem( 'new', JSON.stringify( this.state ) )
  }

  setupBoard() {
    let board = {}
    for( let y = 1; y <= 8; y++ ) {
      board[y] = {}
      for( let x = 1; x <= 8; x++ ) {
        board[y][x] = new Square( x, y )
      }
    }
    return board
  }

  setupPieces() {
    let board = this.state.board
    Object.values( board[2] ).forEach( square => square.piece = new Pawn( 'black' ) )
    board[1][8].piece = new Rook( 'black' )
    board[1][7].piece = new Knight( 'black' )
    board[1][6].piece = new Bishop( 'black' )
    board[1][5].piece = new King( 'black' )
    board[1][4].piece = new Queen( 'black' )
    board[1][3].piece = new Bishop( 'black' )
    board[1][2].piece = new Knight( 'black' )
    board[1][1].piece = new Rook( 'black' )
    Object.values( board[7] ).forEach( square => square.piece = new Pawn( 'white' ) )
    board[8][8].piece = new Rook( 'white' )
    board[8][7].piece = new Knight( 'white' )
    board[8][6].piece = new Bishop( 'white' )
    board[8][5].piece = new King( 'white' )
    board[8][4].piece = new Queen( 'white' )
    board[8][3].piece = new Bishop( 'white' )
    board[8][2].piece = new Knight( 'white' )
    board[8][1].piece = new Rook( 'white' )
  }

  selectedSquare() {
    if ( this.state.selected ) {
      let board = this.state.board
      let selected = this.state.selected
      return board[selected.y][selected.x]
    }
    return null
  }

  isLegal( x, y ) {
    let selected = this.state.selected
    return ( this.selectedSquare().piece.legalMove( selected.x, selected.y, x, y ) && this.pathClear( selected.x, selected.y, x, y) )
  }

  pathClear( x, y, x2, y2 ) {
    if ( this.selectedSquare().piece.name === 'Knight' ) {
      return true
    }

    let dirX = x2 > x ? 1 : ( x2 === x ? 0 : -1 )
    let dirY = y2 > y ? 1 : ( y2 === y ? 0 : -1 )
    let spacesToMove = Math.abs( y2 - y ) > Math.abs( x2 - x ) ? Math.abs( y2 - y ) : Math.abs( x2 - x )

    for ( let i = 1; i < spacesToMove; i++ ) {
      if ( this.pieceOnSquare( x + i * dirX, y + i * dirY ) ) {
        return false
      }
    }
    return true
  }

  pieceOnSquare( x, y ) {
    if ( this.state.board[y] && this.state.board[y][x] ) {
      return this.state.board[y][x].piece !== 'blank'
    }
  }

  handleClick( x, y ) {
    if ( this.state.selected && x === this.state.selected.x && y === this.state.selected.y ) {
      this.setState({ selected: null })
      return
    }
    let piece = this.state.board[y][x].piece
    if ( piece.color === this.state.nextPlayer ) {
      this.setState({ selected: { x: x, y: y } })
      return
    }
    if (this.selectedSquare() && this.isLegal( x,y ) ) {
      this.movePiece( x, y )
    }
    else if ( piece !== 'blank' && piece.color === this.state.nextPlayer ) {
      this.setState({ selected: { x: x, y: y } })
    }
  }

  newGame() {
    this.setState( JSON.parse( sessionStorage.getItem( 'new' ) ) )
  }

  loadGame() {
    this.setState( JSON.parse( sessionStorage.getItem( 'state' ) ) )
  }

  saveGame() {
    sessionStorage.setItem( 'state', JSON.stringify( this.state ) )
  }

  movePiece( x, y ) {
    this.selectedSquare().piece.moves++
    let currentState = this.state
    currentState.nextPlayer === 'white' ? currentState.nextPlayer = 'black' : currentState.nextPlayer = 'white'
    currentState.board[y][x].piece = this.selectedSquare().piece
    this.setState(currentState)
    this.selectedSquare().piece = 'blank'
    this.setState({ selected: null })
  }

  render() {
    let boardDisplay = Object.values( this.state.board ).map( ( row, index ) => {
      let rows = Object.values( row ).map( square => {
        let classArray = []
        classArray.push( square.piece.name );
        ( square.x + square.y ) % 2 === 0 ? classArray.push( 'whiteSquare' ) : classArray.push( 'blackSquare' )
        if ( this.selectedSquare() === square ) { classArray.push( 'highlight' )}
        if ( this.state.selected && this.isLegal( square.x, square.y ) ) { classArray.push( 'highlight' )}
        if ( square.piece ) { classArray.push( square.piece.color )}
        let classes = classArray.join( ' ' )

        return ( <div
                  key={ square.x + square.y }
                  onClick={ () => this.handleClick( square.x,square.y )}
                  className={ `square + ${classes}` }>
                </div> )
      })
      return <div className='row' key={ index }>{ rows }</div>
    })

    return (
      <div className='board'>
        { boardDisplay }
        <button className='button' onClick={this.newGame.bind(this)}>New Game</button>
        <button className='button' onClick={this.saveGame.bind(this)}>Save Game</button>
        <button className='button' onClick={this.loadGame.bind(this)}>Load Game</button>
      </div>
    )
  }
}
