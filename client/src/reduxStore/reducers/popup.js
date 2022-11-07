import { TOGGLE_POPUP } from '../types';

const initialState = {
	isVisible: false
};

const popupReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case TOGGLE_POPUP:
			return { ...state, isVisible: payload };
		default:
			return state;
	}
};

export default popupReducer;
