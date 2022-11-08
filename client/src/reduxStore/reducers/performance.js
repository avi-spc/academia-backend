import { GET_PERFORMANCE, GET_STUDENTS } from '../types';

const initialState = {
	performance: null,
	studentsSubmitted: []
};

const performanceReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PERFORMANCE:
			return { ...state, performance: payload };
		case GET_STUDENTS:
			return { ...state, studentsSubmitted: payload.studentsSubmitted };
		default:
			return state;
	}
};

export default performanceReducer;
