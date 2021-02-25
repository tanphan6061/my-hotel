import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './../reducers';
import rootSaga from '../sagas';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const configureStore = (preloadedState) => {
  const middlewares = [thunk, sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancers(...enhancers),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
