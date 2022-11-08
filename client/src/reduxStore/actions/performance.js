import axios from 'axios';

import { GET_ACCOUNT, GET_PERFORMANCE } from '../types';

export const enrollCourse = (accessCode) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(accessCode);
	const couresId = '6368d53b1eac6d27df2ae62e';

	try {
		const res = await axios.post(`/performance/${couresId}`, body, config);

		dispatch({ type: GET_ACCOUNT, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};

export const getPerformance = () => async (dispatch) => {
	try {
		const res = await axios.get('/performance/student');

		dispatch({ type: GET_PERFORMANCE, payload: res.data.studentPerformance });
	} catch (err) {
		console.log(err);
	}
};

export const submitAssignment = (assignment, courseId, assignmentId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(assignment);

	try {
		const res = await axios.post(`/performance/assignment/${courseId}/${assignmentId}`, body, config);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.performance });
	} catch (err) {
		console.log(err);
	}
};

export const submitProject = (project, courseId, projectId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(project);

	try {
		const res = await axios.post(`/performance/project/${courseId}/${projectId}`, body, config);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.performance });
	} catch (err) {
		console.log(err);
	}
};
