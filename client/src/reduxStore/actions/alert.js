import { v4 as uuid } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from '../types';

export const setAlert = (message, category) => (dispatch) => {
	const id = uuid();

	dispatch({ type: SET_ALERT, payload: { id, message, category } });

	setTimeout(() => {
		dispatch({ type: REMOVE_ALERT, payload: id });
	}, 3000);
};

export const removeAlert = (alertId) => (dispatch) => {
	dispatch({ type: REMOVE_ALERT, payload: alertId });
};
