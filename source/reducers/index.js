import { handleAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { ADD_SUBSCRIBE_ITEM, COVER_SUBSCRIBE_ITEM } from '../actions';

/*export const rootReducers = handleAction( ADD_SUBSCRIBE_ITEM, (state = [], action) => {
	return Object.assign(
			{},
			...state,
			{ list: [...state.list, action.payload] }
		);	
});*/

export const rootReducers = handleActions({
	ADD_SUBSCRIBE_ITEM: ( state, action ) => {
		console.log(state);
		return Object.assign(
			{},
			state,
			{ list: [...state.list, action.payload] }
		);
	},
	COVER_SUBSCRIBE_ITEM: ( state, action ) => {
		//console.log(state, action)
		return Object.assign(
			{},
			state,
			{ list: [...action.payload] }
		);
	}
});