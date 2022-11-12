import { TOGGLE_POPUP, TOGGLE_UPDATE_DOC_POPUP, TOGGLE_UPDATE_POPUP } from '../types';

export const togglePopup = (isVisible) => (dispatch) => {
	dispatch({ type: TOGGLE_POPUP, payload: isVisible });
};

export const toggleUpdatePopup = (isUpdate) => (dispatch) => {
	dispatch({ type: TOGGLE_UPDATE_POPUP, payload: isUpdate });
};

export const toggleUpdateDocPopup = (isDocUpdate) => (dispatch) => {
	dispatch({ type: TOGGLE_UPDATE_DOC_POPUP, payload: isDocUpdate });
};
