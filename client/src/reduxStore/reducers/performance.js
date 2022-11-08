import { GET_PERFORMANCE } from '../types';

const initialState = {
	performance: null
};

const performanceReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PERFORMANCE:
			return { ...state, performance: payload };
		default:
			return state;
	}
};

export default performanceReducer;
