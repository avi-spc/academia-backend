import axios from '../../utils/axiosInstance';

import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	GET_ACCOUNT,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SET_LOADING,
	LOGOUT
} from '../types';
import { setAuthToken } from '../../utils/setAuthToken';
import { setAlert } from './alert';

export const registerAccount = (account, type) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(account);

	try {
		let res = null;

		switch (type) {
			case 'instructor':
				res = await axios.post('/instructors', body, config);
				break;
			case 'student':
				res = await axios.post('/students', body, config);
				break;
			default:
				break;
		}

		dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		dispatch(getAccount());
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: REGISTER_ERROR });
	}
};

export const getAccount = () => async (dispatch) => {
	dispatch(setLoading(true));

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/students');

		dispatch({ type: GET_ACCOUNT, payload: res.data });
		dispatch(setLoading(false));
	} catch (err) {
		console.log(err);
		dispatch(setLoading(false));
	}
};

export const loginAccount = (account, type) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(account);

	try {
		let res = null;

		switch (type) {
			case 'instructor':
				res = await axios.post('/instructors/login', body, config);
				break;
			case 'student':
				res = await axios.post('/students/login', body, config);
				break;
			default:
				break;
		}

		dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		dispatch(getAccount());
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});

		dispatch({ type: LOGIN_ERROR });
	}
};

export const setLoading = (isLoading) => (dispatch) => {
	dispatch({ type: SET_LOADING, payload: isLoading });
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
