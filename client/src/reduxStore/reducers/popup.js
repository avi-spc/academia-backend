import { TOGGLE_POPUP, TOGGLE_UPDATE_DOC_POPUP, TOGGLE_UPDATE_POPUP } from '../types';

const initialState = {
	isVisible: false,
	isUpdate: false,
	isDocUpdate: false
};

const popupReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case TOGGLE_POPUP:
			return { ...state, isVisible: payload };
		case TOGGLE_UPDATE_POPUP:
			return { ...state, isUpdate: payload };
		case TOGGLE_UPDATE_DOC_POPUP:
			return { ...state, isDocUpdate: payload };
		default:
			return state;
	}
};

export default popupReducer;
