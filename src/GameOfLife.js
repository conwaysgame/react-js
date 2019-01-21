import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

import './GameOfLife.css';

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      worldSize: props.width * props.height,
      populatedCells: (props.startingPopulation || []).map((cell) => {
        return cell[0] + (cell[1] * props.width);
      }),
    };
  }

  getPopulatedCellsAfter(populatedCells) {
    let newPopulatedCells = [];
    for (let x = 0; x < this.state.width; x++) {
      for (let y = 0; y < this.state.height; y++) {
        const currentCellIndex = x + (y * this.state.width);
        let numberOfPopulatedNeighbours = 0;
        for (let nx = x - 1; nx <= Math.min(this.state.width - 1, x + 1); nx++) {
          for (let ny = y - 1; ny <= Math.min(this.state.height - 1, y + 1); ny++) {
            let cellIndex = nx + (ny * this.state.width);
            let populated = populatedCells.includes(cellIndex);
            if ((nx !== x || ny !== y) && populated) {
              ++numberOfPopulatedNeighbours;
            }
          }
        }

        const currentCellPopulated = populatedCells.includes(currentCellIndex);
        if (numberOfPopulatedNeighbours === 3) {
          newPopulatedCells.push(currentCellIndex);
        } else if (numberOfPopulatedNeighbours === 2 && currentCellPopulated) {
          newPopulatedCells.push(currentCellIndex);
        }
      }
    }
    return newPopulatedCells;
  }

  componentDidUpdate(prevProps) {
    if (this.props.generation !== prevProps.generation) {
      for (let gen = prevProps.generation + 1; gen <= this.props.generation; gen++) {
        this.setState({ populatedCells: this.getPopulatedCellsAfter(this.state.populatedCells) });
      }
    }
  }

  render() {
    const worldSize = this.state.width * this.state.height;
    let cells = [];
    for (let i = 0; i < worldSize; i++) {
      const props = { populated: false };
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
  generation: PropTypes.number,
}

GameOfLife.defaultProps = {
  generation: 0,
}

export default GameOfLife;
