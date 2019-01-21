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
      border: this.props.border,
    };
  }

  cellIsPopulated(populatedCells, x, y) {
    let cellIndex = x + (y * this.state.width);
    return populatedCells.includes(cellIndex);
  }

  getAdjacentCellCoordinates(x, y) {
    let left = x - 1;
    let right = x + 1;
    if (this.state.border === 'marquee') {
      if (left < 0) {
        left = this.state.width - 1;
      }
      if (right >= this.state.width) {
        right = 0;
      }
    } else {
      right = Math.min(this.state.width - 1, x + 1);
    }

    let top = y - 1;
    let bottom = y + 1;
    if (this.state.border === 'marquee') {
      if (bottom >= this.state.height) {
        bottom = 0;
      }
      if (top < 0) {
        top = this.state.height - 1;
      }
    } else {
      bottom = Math.min(this.state.height - 1, y + 1);
    }

    return {
      top, right, bottom, left,
    };
  }

  getPopulatedCellsAfter(populatedCells) {
    let newPopulatedCells = [];
    // TODO: Make this more efficient. The smallest
    // number that it could possibly be be is the
    // smallest in the pop. cells minus (width + 1)
    // and the biggest is the biggest in pop. cells
    // plus (width + 1). But need to take marquee borders
    // into account. Could do a for (let x of candidates(populatedCells))
    // to make a shortlist. Or could go through each populated cell,
    // go through each neighbour, then add it to the "checked it"
    // list - this is definitely more efficient
    for (let x = 0; x < this.state.width; x++) {
      for (let y = 0; y < this.state.height; y++) {
        const currentCellIndex = x + (y * this.state.width);
        let numberOfPopulatedNeighbours = 0;
        // let cellRight = x + 1 >= this.state.width ? 0 : x + 1;
        // let cellBelow = y + 1 >= this.state.height ? 0 : y + 1;
        const { top, right, bottom, left } = this.getAdjacentCellCoordinates(x, y);
        let xOptions = x === right ? [left, x] : [left, x, right];
        let yOptions = y === bottom ? [top, y] : [top, y, bottom];

        for (let nx of xOptions) {
          for (let ny of yOptions) {
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
    if (this.props.started !== prevProps.started) {
      this.setState({ started: this.props.started });
    }
    if (this.state.started === true && !prevState.started) {
      setTimeout(() => {
        this.setState({ generation: this.state.generation + 1 })
      }, 100);
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
        }, 100);
      }
    }
  }

  toggleCell(cellIndexValue) {
    if (this.state.populatedCells.includes(cellIndexValue)) {
      this.setState({
        populatedCells: this.state.populatedCells.filter(value => value !== cellIndexValue),
      });
    } else {
      this.setState({
        populatedCells: [...this.state.populatedCells, cellIndexValue],
      });
    }
  }

  toggleGame() {
    this.setState({
      started: !this.state.started,
    });
  }

  render() {
    const worldSize = this.state.width * this.state.height;
    let cells = [];
    for (let i = 0; i < worldSize; i++) {
      const props = { populated: false, width: this.props.cellWidth };
      if (this.state.populatedCells.includes(i)) {
        props.populated = true;
      }
      cells.push(<Cell key={"cell-" + i} onClick={(() => {
        this.toggleCell(i);
      }).bind(this)} {...props} />);
    }

    const style = {
      display: 'block',
      width: this.state.width * this.props.cellWidth,
    };

    return (
      <div>
        <div className="GameOfLife" style={style}>
          {cells}
        </div>
        <div className="ControlPanel">
          <button onClick={this.toggleGame.bind(this)}>{this.state.started ? 'Pause' : 'Start'}</button>
        </div>
      </div>
    );
  }
}

GameOfLife.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  generation: PropTypes.number,
  start: PropTypes.bool,
  gridBehaviour: PropTypes.bool,
  border: PropTypes.oneOf(['hard', 'marquee']),
  cellWidth: PropTypes.number,
}

GameOfLife.defaultProps = {
  generation: 0,
  start: false,
  border: 'hard',
  cellWidth: 20,
}

export default GameOfLife;
