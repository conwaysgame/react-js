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
      populatedCells: (props.startingPopulation || []).map((cell) => {
        return cell[0] + (cell[1] * props.width);
      }),
    };
  }

  render() {
    const worldSize = this.state.width * this.state.height;
    let cells = [];
    for (let i = 0; i < worldSize; i++) {
      const props = {};
      if (this.state.populatedCells.includes(i)) {
        props.populated = true;
      }
      cells.push(<Cell key={"cell-" + i} {...props} />);
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
