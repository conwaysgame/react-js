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

it('should fill cell 7 for [3, 1]', () => {
  const div = document.createElement('div');
  const population = [[3, 1],]
  const game = <GameOfLife width={4} height={4} startingPopulation={population} />;
  const wrapper = mount(game);
  const allCells = wrapper.find(Cell);
  const cellAt31 = allCells.at(7); // 3, 1 is at 7
  const cellAt22 = allCells.at(10); // 2, 2 is at 10
  cellAt31.props().populated.should.equal(true);
  cellAt22.props().populated.should.equal(false);
});

describe('when the population is specified in props and then stepped', () => {
  /*
  oxoo
  ooxo
  xxxo
  oooo
  [1, 6, 8, 9, 10]
  */
  let wrapper, allCells, game;
  beforeAll(() => {
    const div = document.createElement('div');
    const gliderPopulation = [[1, 0],[2, 1],[0, 2],[1, 2],[2, 2],]
    const game = <GameOfLife width={4} height={4} startingPopulation={gliderPopulation} />;
    wrapper = mount(game);
    allCells = wrapper.find(Cell);
  });

  it('should make only the three specified items have the populated prop', () => {
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

    const deadCells = wrapper.findWhere(cell => cell.props().populated === false);
    const cellAt11 = allCells.at(5); // 1, 1 is at 5
    cellAt11.props().populated.should.equal(false);
    deadCells.should.have.lengthOf(11);
  });

  it('should change the population when the generation changes by 1', () => {
    /*
    oooo
    xoxo
    oxxo
    oxoo
    [4, 6, 9, 10, 13]
    */
    wrapper.setProps({ generation: 1 });
    wrapper.update();
    allCells = wrapper.find(Cell);
    allCells.should.have.lengthOf(16);
    const cellAt01 = allCells.at(4);
    const cellAt21 = allCells.at(6);
    const cellAt12 = allCells.at(9);
    const cellAt22 = allCells.at(10);
    const cellAt13 = allCells.at(13);
    cellAt01.props().populated.should.equal(true);
    cellAt21.props().populated.should.equal(true);
    cellAt12.props().populated.should.equal(true);
    cellAt22.props().populated.should.equal(true);
    cellAt13.props().populated.should.equal(true);

    const deadCells = wrapper.findWhere(cell => cell.props().populated === false);
    const cellAt11 = allCells.at(5); // 1, 1 is at 5
    cellAt11.props().populated.should.equal(false);
    deadCells.should.have.lengthOf(11);
  });

  it('should change the population when the generation changes by 2', () => {
    /*
    oooo
    ooxo
    xoxo
    oxxo
    [6, 8, 10, 13, 14]
    */
    wrapper.setProps({ generation: 2 });
    wrapper.update();
    allCells = wrapper.find(Cell);
    allCells.should.have.lengthOf(16);
    const cellAt21 = allCells.at(6);
    const cellAt02 = allCells.at(8);
    const cellAt22 = allCells.at(10);
    const cellAt13 = allCells.at(13);
    const cellAt23 = allCells.at(14);
    cellAt21.props().populated.should.equal(true);
    cellAt02.props().populated.should.equal(true);
    cellAt22.props().populated.should.equal(true);
    cellAt13.props().populated.should.equal(true);
    cellAt23.props().populated.should.equal(true);

    const deadCells = wrapper.findWhere(cell => cell.props().populated === false);
    const cellAt11 = allCells.at(5); // 1, 1 is at 5
    cellAt11.props().populated.should.equal(false);
    deadCells.should.have.lengthOf(11);
  });
});

describe('when grid behaviour is marquee', () => {
  let game, wrapper;

  beforeAll(() => {
    const div = document.createElement('div');
    const population = [[0, 0], [0, 1], [0, 2],];
    game = <GameOfLife width={4} height={4} startingPopulation={population} border='marquee' />;
    wrapper = mount(game);
  });

  it('should put a triomino line which is cut off to the other side on generation increment', () => {
    /*
    xooo     oooo
    xooo --> xxox
    xooo     oooo
    oooo     oooo
    */
    let allCells = wrapper.find(Cell);
    allCells.should.have.lengthOf(16);
    allCells.at(0).props().populated.should.equal(true);
    allCells.at(4).props().populated.should.equal(true);
    allCells.at(8).props().populated.should.equal(true);
    wrapper.setProps({ generation: 1 });
    wrapper.update();
    allCells = wrapper.find(Cell);
    allCells.should.have.lengthOf(16);
    allCells.at(4).props().populated.should.equal(true);
    allCells.at(5).props().populated.should.equal(true);
    allCells.at(7).props().populated.should.equal(true);

    const deadCells = wrapper.findWhere(cell => cell.props().populated === false);
    deadCells.should.have.lengthOf(13);
  });
});