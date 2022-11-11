import {
	CREATE_COURSE_SUCCESS,
	DISCARD_FILE,
	GET_ALL_COURSES,
	GET_ANNOUNCEMENTS,
	GET_INDIVIDUAL_COURSE,
	GET_STUDENTS_ENROLLED,
	UPLOAD_FILE
} from '../types';

const initialState = {
	courses: [],
	individualCourse: {
		course: null,
		announcements: []
	},
	documentId: null,
	studentsEnrolled: []
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
		case GET_STUDENTS_ENROLLED:
			return { ...state, studentsEnrolled: payload.students };
		case GET_ANNOUNCEMENTS:
			return {
				...state,
				individualCourse: {
					...state.individualCourse,
					announcements: payload.announcements
				}
			};
		case UPLOAD_FILE:
			return { ...state, documentId: payload.documentId };
		case DISCARD_FILE:
			return { ...state, documentId: null };
		default:
			return state;
	}
};

export default courseReducer;
