import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';


const middleware = applyMiddleware(
	promiseMiddleware
);

const finalCreateStore = compose(
    middleware
)(createStore);

export default finalCreateStore;