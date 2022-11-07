import axios from 'axios';

import { CREATE_COURSE_SUCCESS, GET_ALL_COURSES, GET_INDIVIDUAL_COURSE } from '../types';

export const createCourse = (course) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(course);

	try {
		const res = await axios.post('/courses', body, config);

		dispatch({ type: CREATE_COURSE_SUCCESS, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};

export const getAllCourses = () => async (dispatch) => {
	try {
		const res = await axios.get('/courses');

		dispatch({ type: GET_ALL_COURSES, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};

export const getIndividualCourse = (courseId) => async (dispatch) => {
	try {
		const res = await axios.get(`/courses/${courseId}`);

		dispatch({ type: GET_INDIVIDUAL_COURSE, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};
