import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from 'common/reducers';

export default () => createStore(reducers, {}, applyMiddleware(reduxThunk));