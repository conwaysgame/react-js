import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { should } from 'chai';
should();
import GameOfLife from './GameOfLife';
import Cell from './Cell';

it('renders a 4x4 game without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameOfLife width={4} height={4} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains 16 squares on a 4x4 game', () =>{
  const div = document.createElement('div');
  const wrapper = mount(<GameOfLife width={4} height={4} />);
  wrapper.find(Cell).should.have.lengthOf(16);
});

describe('when the population is specified in props', () => {
  /*
  oxoo
  oox0
  xxx0
  0000
  */
  let wrapper, allCells;
  beforeAll(() => {
    const div = document.createElement('div');
    const gliderPopulation = [[1, 0],[2, 1],[0, 2],[1, 2],[2, 2],]
    const game = <GameOfLife width={4} height={4} startingPopulation={gliderPopulation} />;
    wrapper = mount(game);
    allCells = wrapper.find(Cell);
  });

  it('should make the three specified items have the populated prop', () => {
    allCells.should.have.lengthOf(16);
    const cellAt10 = allCells.at(1); // 0, 0 is at 0
    const cellAt21 = allCells.at(6); // 2, 1 is at 6
    const cellAt02 = allCells.at(8); // 0, 2 is at 8
    const cellAt12 = allCells.at(9); // 1, 2 is at 9
    const cellAt22 = allCells.at(10); // 2, 2 is at 10
    cellAt10.props().populated.should.equal(true);
    cellAt21.props().populated.should.equal(true);
    cellAt02.props().populated.should.equal(true);
    cellAt12.props().populated.should.equal(true);
    cellAt22.props().populated.should.equal(true);
  });

  it('should not populate the other cells', () => {
    const deadCells = wrapper.findWhere(cell => cell.props().populated === false);
    const cellAt11 = allCells.at(5); // 1, 1 is at 5
    cellAt11.props().populated.should.equal(false);
    deadCells.should.have.lengthOf(11);
  });
});

