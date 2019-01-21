import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameOfLife from './GameOfLife';
import * as serviceWorker from './serviceWorker';

const gliderPopulation = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2],]
ReactDOM.render(<GameOfLife
    width={20}
    height={20}
    startingPopulation={gliderPopulation}
    start={true}
    border='marquee'
    cellWidth={10}
/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
