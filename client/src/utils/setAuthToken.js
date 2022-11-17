import axios from './axiosInstance';

export const setAuthToken = (token) => {
	if (!token) {
		delete axios.defaults.headers.common['x-auth-token'];
		return;
	}

	axios.defaults.headers.common['x-auth-token'] = token;
};
