import { createAction } from 'redux-actions';

export const ADD_SUBSCRIBE_ITEM = 'ADD_SUBSCRIBE_ITEM';
export const COVER_SUBSCRIBE_ITEM = 'COVER_SUBSCRIBE_ITEM';

export const addSubscribeAction = createAction( ADD_SUBSCRIBE_ITEM, async subscribe => {
	//let result = await fetch('/api').then( res => res.json() );

	return subscribe;
});

export const coverSubscribeAction = createAction( COVER_SUBSCRIBE_ITEM, async subscribe => {
	//let result = await fetch('/api').then( res => res.json() );

	return subscribe;
});