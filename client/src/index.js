import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/FontIcons/styles.css'
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';

import registerServiceWorker from './registerServiceWorker';



const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
