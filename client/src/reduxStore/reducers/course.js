import { CREATE_COURSE_SUCCESS, GET_ALL_COURSES, GET_INDIVIDUAL_COURSE } from '../types';

const initialState = {
	courses: [],
	individualCourse: null
};

const courseReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_COURSES:
			return { ...state, courses: payload.courses };
		case CREATE_COURSE_SUCCESS:
			return { ...state, courses: [...state.courses, payload.course] };
		case GET_INDIVIDUAL_COURSE:
			return { ...state, individualCourse: payload.course };
		default:
			return state;
	}
};

export default courseReducer;
