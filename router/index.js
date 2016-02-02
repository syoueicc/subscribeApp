import path from 'path';
import router from 'koa-router';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducers } from '../source/reducers';
import { RenderReact } from '../utils';
import APIS from './apis';
import { User, SubList } from '../Model';

import App from '../source/containers/App';
import ProcessPage from '../source/components/ProcessPage';
import _random from 'lodash/random';
import _times from 'lodash/times';
import _map from 'lodash/map';
import _property from 'lodash/property';

const routes = router();
APIS(routes);

routes
.get('/', function *(next) {
	const user = yield User.findOne({
		attributes: ['id', 'token'],
		where: {
			id: 1
		}
	});
	const list = yield SubList.findAll({
		attributes: ['id', 'userid', 'indname', 'typename', 'tagname', 'process'],
		where: {
			userid: 1
		}
	});
	let initialState = {
		user,
		list
	};

	const store = createStore( rootReducers, initialState );
	const finalState = store.getState()
	const reactString = renderToStaticMarkup(
			<Provider store={store}>
				<App />
			</Provider>
		);

	this.body = RenderReact('index', reactString, finalState);
})
.get('/item/:id', function *(next) {
	const initialState = {
	};
	const store = createStore( rootReducers, initialState );
	const finalState = store.getState()
	const reactString = renderToStaticMarkup(
			<Provider store={store}>
				<App context={<ProcessPage />} />
			</Provider>
		);

	this.body = RenderReact('index', reactString, finalState);
});

export default routes;