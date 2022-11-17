import axios from '../../utils/axiosInstance';

import { GET_ACCOUNT, GET_PERFORMANCE, GET_STUDENTS } from '../types';
import { setAlert } from './alert';

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
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});
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

export const getStudentPerformance = (studentId) => async (dispatch) => {
	try {
		const res = await axios.get(`/performance/student/${studentId}`);

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
		const res = await axios.post(
			`/performance/assignment/${courseId}/${assignmentId}`,
			body,
			config
		);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.performance });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const unsubmitAssignment = (courseId, assignmentId, documentId) => async (dispatch) => {
	try {
		const res = await axios.delete(
			`/performance/assignment/${courseId}/${assignmentId}/${documentId}`
		);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.performance });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const gradeAssignment = (marks, studentId, courseId, assignmentId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(marks);

	try {
		const res = await axios.put(
			`/performance/assignment/${studentId}/${courseId}/${assignmentId}`,
			body,
			config
		);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.performance });
		dispatch(setAlert(res.data.msg, 'success'));
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

export const addProjectTeamMember = (courseId, memberId) => async (dispatch) => {
	try {
		const res = await axios.put(`/performance/projectTeam/${courseId}/${memberId}`);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.performance });
	} catch (err) {
		console.log(err);
	}
};

export const removeProjectTeamMember = (courseId, memberId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/performance/projectTeam/${courseId}/${memberId}`);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.performance });
	} catch (err) {
		console.log(err);
	}
};

export const unsubmitProject = (courseId, documentId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/performance/project/${courseId}/${documentId}`);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.teamLeader });
	} catch (err) {
		console.log(err);
	}
};

export const gradeProject = (marks, studentId, courseId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(marks);

	try {
		const res = await axios.put(`/performance/project/${studentId}/${courseId}`, body, config);

		dispatch({ type: GET_PERFORMANCE, payload: res.data.performance });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const getStudents = (choreId, choreType) => async (dispatch) => {
	try {
		let res = null;
		switch (choreType) {
			case 'assignment':
				res = await axios.get(`/performance/assignment/${choreId}`);
				break;
			case 'project':
				res = await axios.get(`/performance/project/${choreId}`);
				break;
			default:
				break;
		}
		dispatch({ type: GET_STUDENTS, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};
