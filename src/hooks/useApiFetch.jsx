import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify'; // Importar react-toastify

function useApiFetch() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function fetchApi(url, method = 'GET', body = null) {
		if (typeof url !== 'string') {
			setError('URL must be a string');
			toast.error('URL must be a string');
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const res = await api({
				url,
				method: method.toUpperCase(),
				data: method.toUpperCase() !== 'GET' ? body : undefined,
			});

			toast.success('Request successful!');

			switch (method.toUpperCase()) {
				case 'POST': {
					setData((prev) => [...prev, res.data]);
					break;
				}
				case 'DELETE': {
					const id = parseInt(url.split('/').pop(), 10);
					setData((prev) => prev.filter((item) => item.id !== id));
					break;
				}
				case 'GET': {
					setData(res.data);
					break;
				}
				default: {
					setData(res.data);
					break;
				}
			}
		} catch (err) {
			setError(err.message || 'An error occurred');
			toast.error(`Error: ${err.message || 'An error occurred'}`);
		} finally {
			setLoading(false);
		}
	}

	return [data, fetchApi, loading, error];
}

export default useApiFetch;
