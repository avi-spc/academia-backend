import { Fragment } from 'react';

import { useForm } from '../../hooks/useForm';

const StudentSignUp = ({ register }) => {
	const { formData, onChange } = useForm({ instituteId: '', password: '', name: '' });
	const { instituteId, password, name } = formData;

	return (
		<Fragment>
			<form className="sign-up__form--student" onSubmit={(e) => register(e, formData)}>
				<input
					type="text"
					placeholder="institute id"
					name="instituteId"
					value={instituteId}
					onChange={onChange}
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					value={password}
					onChange={onChange}
				/>
				<input
					type="text"
					placeholder="name"
					name="name"
					value={name}
					onChange={onChange}
				/>
				<button className="btn btn--round">Sign Up</button>
			</form>
		</Fragment>
	);
};

export default StudentSignUp;
