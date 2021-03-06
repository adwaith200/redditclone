import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import authreducer from './store/reducers/auth';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Rootreducer=combineReducers({
    auth:authreducer
  });
  
const store=createStore(Rootreducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
