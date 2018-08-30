import React from 'react';
import { render } from 'react-dom';

const App = () => (
    <h2>Hello React</h2>
);

render(
    <App />,
    document.getElementById('root')
);