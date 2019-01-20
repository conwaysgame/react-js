import React from 'react';
import ReactDOM from 'react-dom';
import GameOfLife from './GameOfLife';

it('renders a 4x4 game without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameOfLife width={4} height={4} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
