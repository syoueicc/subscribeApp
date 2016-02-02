import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import DevTools from '../containers/DevTools';


const middleware = applyMiddleware(
	promiseMiddleware
);

const finalCreateStore = compose(
    middleware,
    DevTools.instrument()
)(createStore);

export default finalCreateStore;