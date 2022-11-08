import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	GET_ACCOUNT,
	LOGIN_SUCCESS,
	LOGIN_ERROR
} from '../types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	account: null
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ACCOUNT:
			return {
				...state,
				isAuthenticated: true,
				account: { ...payload.account, type: payload.type }
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, token: payload.token, isAuthenticated: true };
		case REGISTER_ERROR:
		case LOGIN_ERROR:
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, account: null };
		default:
			return state;
	}
};

export default authReducer;
