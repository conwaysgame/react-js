import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

import './GameOfLife.css';

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      world: [],
      width: props.width,
      height: props.height,
      worldSize: props.width * props.height,
    };
  }

  render() {
    const worldSize = this.state.width * this.state.height;
    let cells = [];
    for (let i = 0; i < worldSize; i++) {
      cells.push(<Cell key={"cell-" + i} />);
    }
    return (
      <div className="GameOfLife">
        {cells}
      </div>
    );
  }
}

GameOfLife.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

export default GameOfLife;
