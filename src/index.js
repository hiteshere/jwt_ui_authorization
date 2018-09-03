import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Signup from './components/user/signup';
import Routes from './routes';
// import registerServiceWorker from './registerServiceWorker';
// import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers/index'


const createStoreWithMiddleware = applyMiddleware(promise, thunk)(
  createStore
);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
export const store = createStoreWithMiddleware(reducers);
ReactDOM.render((
  <Provider store={store}>
    <Routes />
  </Provider>
), document.getElementById('root'))
