import 'normalize.css/normalize.css';
import './static/styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <React.Fragment>
    <h1>React Boilerplate</h1>
    <h2>By Black Jelly</h2>
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('app'));
