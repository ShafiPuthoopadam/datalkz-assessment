import { createStore } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];

function reduxStore(initialState) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && window.devToolsExtension()
  ));

  return store;
}

export default reduxStore;
