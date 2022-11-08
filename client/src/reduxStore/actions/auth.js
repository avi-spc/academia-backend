import axios from 'axios';

import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	GET_ACCOUNT,
	LOGIN_SUCCESS,
	LOGIN_ERROR
} from '../types';
import { setAuthToken } from '../../utils/setAuthToken';

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
		console.log(err);
		dispatch({ type: REGISTER_ERROR });
	}
};

export const getAccount = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/students');

		dispatch({ type: GET_ACCOUNT, payload: res.data });
	} catch (err) {
		console.log(err);
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
		console.log(err);
		dispatch({ type: LOGIN_ERROR });
	}
};
