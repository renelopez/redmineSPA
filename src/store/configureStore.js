import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
export const history = createHistory();


function configureStoreProd(initialState){
  const reactRouterMiddleware=routerMiddleware(history);
  const middlewares=[
    thunk,
    reactRouterMiddleware
  ];
  return createStore(initialState,initialState,compose(
    applyMiddleware(...middlewares)
  ))
}


function configureStoreDev(initialState){
  const reactRouterMiddleware=routerMiddleware(history);
  const middlewares=[
    reduxImmutableStateInvariant(),
    thunk,
    reactRouterMiddleware
  ];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(initialState,initialState,composeEnhancers(
    applyMiddleware(...middlewares)
  ));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;

