import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let model = {
    running: false,
    time: 0
};

let view = (m) => {
    let minutes = Math.floor(m.time / 60);
    let seconds = m.time - (minutes * 60);
    let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
    let handler = (event) => {
        model = update(model, m.running ? 'STOP':'START');
    };
    return <div>
    <p>{minutes}:{secondsFormatted}</p>
    <button onClick={handler}>{m.running ? 'STOP':'START'}</button>
    </div>;
};

let intents = {
    TICK: 'TICK',
    START: 'START',
    STOP: 'STOP',
    RESET: 'RESET'
};

const update = (model, intent) => {
    const updates = {
        'TICK': (model) => Object.assign(model, {time: model.time + (model.running ? 1 : 0)}),
        'START': (model) => Object.assign(model, {running: true}),
        'STOP':(model) => Object.assign(model, {running: false})
    };
    return updates[intent](model);
};

const render = () => {
    ReactDOM.render(view(model), document.getElementById('root'));
};
render();

setInterval(() => {
    model = update(model, 'TICK');
    render();
}, 1000);

