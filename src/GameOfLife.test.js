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