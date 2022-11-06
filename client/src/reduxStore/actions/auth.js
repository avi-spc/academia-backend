import axios from 'axios';

import {
	INSTRUCTOR_REGISTER_SUCCESS,
	INSTRUCTOR_REGISTER_ERROR,
	GET_INSTRUCTOR,
	INSTRUCTOR_LOGIN_SUCCESS,
	INSTRUCTOR_LOGIN_ERROR
} from '../types';
import { setAuthToken } from '../../utils/setAuthToken';

export const registerInstructor = (instructor) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(instructor);

	try {
		const res = await axios.post('/instructors', body, config);

		dispatch({ type: INSTRUCTOR_REGISTER_SUCCESS, payload: res.data });
		dispatch(getInstructor());
	} catch (err) {
		console.log(err);
		dispatch({ type: INSTRUCTOR_REGISTER_ERROR });
	}
};

export const getInstructor = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/instructors');

		dispatch({ type: GET_INSTRUCTOR, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};

export const loginInstructor = (instructor) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(instructor);

	try {
		const res = await axios.post('/instructors/login', body, config);

		dispatch({ type: INSTRUCTOR_LOGIN_SUCCESS, payload: res.data });
		dispatch(getInstructor());
	} catch (err) {
		console.log(err);
		dispatch({ type: INSTRUCTOR_LOGIN_ERROR });
	}
};
