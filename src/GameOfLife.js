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
      generation: props.generation,
      started: props.start,
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

  componentDidMount() {
    if (this.state.started) {
      setTimeout(this.setState({ generation: this.state.generation + 1 }), 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.generation !== prevProps.generation) {
      this.setState({ generation: this.props.generation });
    }
    if (this.state.generation !== prevState.generation) {
      let populatedCellsToProgress = this.state.populatedCells;
      for (let gen = prevState.generation + 1; gen <= this.state.generation; gen++) {
        populatedCellsToProgress = this.getPopulatedCellsAfter(populatedCellsToProgress)
        this.setState({ populatedCells: populatedCellsToProgress });
      }
      if (this.state.started) {
        setTimeout(() => {
          this.setState({ generation: this.state.generation + 1 })
        }, 500);
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

    const style = {
      display: 'block',
      width: this.state.width * 20,
    };

    return (
      <div className="GameOfLife" style={style}>
        {cells}
      </div>
    );
  }
}

GameOfLife.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  generation: PropTypes.number,
  start: PropTypes.bool,
}

GameOfLife.defaultProps = {
  generation: 0,
  start: false,
}

export default GameOfLife;
