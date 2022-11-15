import axios from 'axios';

import {
	CREATE_ANNOUNCEMENT,
	CREATE_COURSE_SUCCESS,
	DISCARD_FILE,
	GET_ACCOUNT,
	GET_ALL_COURSES,
	GET_ANNOUNCEMENTS,
	GET_ASSIGNMENTS,
	GET_INDIVIDUAL_COURSE,
	GET_STUDENTS_ENROLLED,
	UPLOAD_FILE
} from '../types';
import { setAlert } from './alert';

export const createCourse = (course) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(course);

	try {
		const res = await axios.post('/courses', body, config);

		dispatch({ type: GET_ACCOUNT, payload: res.data });
		dispatch(setAlert(res.data.msg, 'success'));
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

export const getAnnouncements = (courseId) => async (dispatch) => {
	try {
		const res = await axios.get(`/announcements/${courseId}`);

		dispatch({ type: GET_ANNOUNCEMENTS, payload: res.data.announcements });
	} catch (err) {
		console.log(err);
	}
};

export const createAnnouncement = (announcement, courseId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(announcement);

	try {
		const res = await axios.post(`/announcements/${courseId}`, body, config);

		dispatch({ type: GET_ANNOUNCEMENTS, payload: res.data.announcements });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const updateAnnouncement = (announcement, courseId, announcementId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(announcement);

	try {
		const res = await axios.put(`/announcements/${courseId}/${announcementId}`, body, config);

		dispatch({ type: GET_ANNOUNCEMENTS, payload: res.data.announcements });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const createChore = (chore, courseId, type) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(chore);

	try {
		let res = null;

		switch (type) {
			case 'assignment':
				res = await axios.put(`/courses/assignments/${courseId}`, body, config);
				break;
			case 'project':
				res = await axios.put(`/courses/project/${courseId}`, body, config);
				break;
			default:
				break;
		}

		dispatch({ type: GET_INDIVIDUAL_COURSE, payload: res.data });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const updateChore = (chore, courseId, choreId, type) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(chore);

	try {
		let res = null;

		switch (type) {
			case 'assignment':
				res = await axios.put(`/courses/assignments/${courseId}/${choreId}`, body, config);
				break;
			case 'project':
				res = await axios.put(`/courses/project/${courseId}/update`, body, config);
				break;
			default:
				break;
		}

		dispatch({ type: GET_INDIVIDUAL_COURSE, payload: res.data });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const updateChoreDoc =
	(document, courseId, choreId, documentId, type) => async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify(document);

		try {
			let res = null;

			switch (type) {
				case 'assignment':
					res = await axios.put(
						`/courses/assignments/${courseId}/${choreId}/${documentId}`,
						body,
						config
					);
					break;
				case 'notes':
					res = await axios.put(
						`/courses/material/${courseId}/${choreId}/${documentId}`,
						body,
						config
					);
					break;
				case 'project':
					res = await axios.put(
						`/courses/project/${courseId}/${choreId}/${documentId}`,
						body,
						config
					);
					break;
				default:
					break;
			}

			dispatch({ type: GET_INDIVIDUAL_COURSE, payload: res.data });
			dispatch(setAlert(res.data.msg, 'success'));
		} catch (err) {
			console.log(err);
		}
	};

export const createStudyMaterial = (studyMaterial, courseId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(studyMaterial);

	try {
		const res = await axios.put(`/courses/material/${courseId}`, body, config);

		dispatch({ type: GET_INDIVIDUAL_COURSE, payload: res.data });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const updateStudyMaterial = (studyMaterial, courseId, noteId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(studyMaterial);

	try {
		const res = await axios.put(`/courses/material/${courseId}/${noteId}`, body, config);

		dispatch({ type: GET_INDIVIDUAL_COURSE, payload: res.data });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};

export const uploadDocument = (form) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'multipart-formdata'
		}
	};

	const body = new FormData(form);

	try {
		const res = await axios.post('/performance/submissions/file', body, config);

		dispatch({ type: UPLOAD_FILE, payload: res.data });
	} catch (err) {
		const errors = err.response.data.errors;

		errors.forEach((error) => {
			dispatch(setAlert(error.msg, 'error'));
		});
	}
};

export const discardDocument = (documentId) => async (dispatch) => {
	try {
		await axios.delete(`/performance/submissions/file/${documentId}`);

		dispatch(clearDocumentId());
	} catch (err) {
		console.log(err);
	}
};

export const clearDocumentId = () => (dispatch) => {
	dispatch({ type: DISCARD_FILE });
};

export const getStudentsEnrolled = (courseId) => async (dispatch) => {
	try {
		const res = await axios.get(`/students/${courseId}`);

		dispatch({ type: GET_STUDENTS_ENROLLED, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};

export const updateCourse = (course, courseId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(course);

	try {
		const res = await axios.put(`/courses/${courseId}`, body, config);

		dispatch({ type: GET_ACCOUNT, payload: res.data });
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.log(err);
	}
};
