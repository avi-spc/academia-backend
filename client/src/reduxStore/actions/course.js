import axios from 'axios';

import {
	CREATE_ANNOUNCEMENT,
	CREATE_COURSE_SUCCESS,
	DISCARD_FILE,
	GET_ALL_COURSES,
	GET_ANNOUNCEMENTS,
	GET_ASSIGNMENTS,
	GET_INDIVIDUAL_COURSE,
	GET_STUDENTS_ENROLLED,
	UPLOAD_FILE
} from '../types';

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
		console.log(err);
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
		console.log(res);
		// dispatch({ type: CREATE_COURSE_SUCCESS, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};
