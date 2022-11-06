import {
	INSTRUCTOR_REGISTER_SUCCESS,
	INSTRUCTOR_REGISTER_ERROR,
	GET_INSTRUCTOR,
	INSTRUCTOR_LOGIN_SUCCESS,
	INSTRUCTOR_LOGIN_ERROR
} from '../types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	instructor: null
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_INSTRUCTOR:
			return { ...state, isAuthenticated: true, instructor: payload.instructor };
		case INSTRUCTOR_REGISTER_SUCCESS:
		case INSTRUCTOR_LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, token: payload.token, isAuthenticated: true };
		case INSTRUCTOR_REGISTER_ERROR:
		case INSTRUCTOR_LOGIN_ERROR:
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, instructor: null };
		default:
			return state;
	}
};

export default authReducer;
