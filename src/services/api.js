import axios from 'axios';

const ls = window.localStorage;

const apiInstance = axios.create({
	baseURL: 'https://hotels-api.academlo.tech',
});

apiInstance.interceptors.request.use(
	(config) => {
		const token = ls.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default apiInstance;
