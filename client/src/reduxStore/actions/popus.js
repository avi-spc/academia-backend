import { TOGGLE_POPUP } from '../types';

export const togglePopup = (isVisible) => (dispatch) => {
	dispatch({ type: TOGGLE_POPUP, payload: isVisible });
};
