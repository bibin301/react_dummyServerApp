import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store, history } from './services';

ReactDOM.render(<Provider store={store}>
    <App /></Provider>, document.getElementById('app'));