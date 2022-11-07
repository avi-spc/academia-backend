import {
	CREATE_COURSE_SUCCESS,
	GET_ALL_COURSES,
	GET_ANNOUNCEMENTS,
	GET_INDIVIDUAL_COURSE
} from '../types';

const initialState = {
	courses: [],
	individualCourse: {
		course: null,
		announcements: []
	}
};

const courseReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_COURSES:
			return { ...state, courses: payload.courses };
		case CREATE_COURSE_SUCCESS:
			return { ...state, courses: [...state.courses, payload.course] };
		case GET_INDIVIDUAL_COURSE:
			return {
				...state,
				individualCourse: { ...state.individualCourse, course: payload.course }
			};
		case GET_ANNOUNCEMENTS:
			return {
				...state,
				individualCourse: {
					...state.individualCourse,
					announcements: payload.announcements
				}
			};
		default:
			return state;
	}
};

export default courseReducer;
