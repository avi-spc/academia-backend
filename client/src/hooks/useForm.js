import { useState } from 'react';

export const useForm = (data) => {
	const initialState = data;
	const [formData, setFormData] = useState(data);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({ ...initialState });
	};

	return { formData, onChange, resetForm };
};
