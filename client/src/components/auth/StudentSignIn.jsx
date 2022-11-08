import { Fragment } from 'react';

import { useForm } from '../../hooks/useForm';

const StudentSignIn = ({ login }) => {
	const { formData, onChange } = useForm({ instituteId: '', password: '' });
	const { instituteId, password } = formData;

	return (
		<Fragment>
			<form className="sign-in__form--instructor" onSubmit={(e) => login(e, formData)}>
				<input
					type="text"
					name="instituteId"
					placeholder="institute id"
					value={instituteId}
					onChange={onChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					value={password}
					onChange={onChange}
				/>
				<button className="btn btn--round">Sign In</button>
			</form>
		</Fragment>
	);
};

export default StudentSignIn;
