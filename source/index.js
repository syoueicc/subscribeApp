import React from 'react';
import { render } from 'react-dom';
import { testAction } from './actions';
import { rootReducers } from './reducers';

import configureStore from './store';
import Root from './containers';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const initialState = window.__INITIAL_STATE__;

const store = configureStore( rootReducers, initialState );

render(
	<Root store={ store }></Root>,
    document.querySelector('#rootElement')
);