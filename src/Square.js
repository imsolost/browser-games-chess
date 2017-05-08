import React, { Component } from 'react'

class Square extends Component {

  squareColor = (index) => {
    if ( (index % 2 === 0 && index < 8) ||
    (index % 2 === 1 && index > 7 && index < 16) ||
    (index % 2 === 0 && index > 15 && index < 23) ||
    (index % 2 === 1 && index > 23 && index < 32) ||
    (index % 2 === 0 && index > 31 && index < 39) ||
    (index % 2 === 1 && index > 39 && index < 48) ||
    (index % 2 === 0 && index > 47 && index < 55) ||
    (index % 2 === 1 && index > 55 && index < 64) ) {
      return <div className='white-square'>{this.props.index}</div>
    } else {
        return <div className='black-square'>{this.props.index}</div>
    }
  }

  render() {
    return (
      <div>{this.squareColor(this.props.index)}</div>
    )
  }
}

export default Square;
