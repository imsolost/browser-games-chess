import React, { Component } from 'react'

class Square extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      piece: null
    }
  }

  position = (index) => {
    return [ Math.floor(index / 8), index % 8 ]
  }

  determineColor = (index) => {
    if ( (index % 2 === 0 && index < 8) ||
    (index % 2 === 1 && index > 7 && index < 16) ||
    (index % 2 === 0 && index > 15 && index < 23) ||
    (index % 2 === 1 && index > 23 && index < 32) ||
    (index % 2 === 0 && index > 31 && index < 39) ||
    (index % 2 === 1 && index > 39 && index < 48) ||
    (index % 2 === 0 && index > 47 && index < 55) ||
    (index % 2 === 1 && index > 55 && index < 64) ) {
      return <div className='white-square'>{this.position(index)}</div>
    } else {
        return <div className='black-square'>{this.position(index)}</div>
    }
  }

  render() {
    return (
      <div>{this.determineColor(this.props.index)}</div>
    )
  }
}

export default Square;
