import { Fragment } from 'react';

import { useForm } from '../../hooks/useForm';

const InstructorSignUp = ({ register, setAlert }) => {
	const { formData, onChange } = useForm({
		email: '',
		password: '',
		name: '',
		confirmPasswrod: ''
	});
	const { email, password, confirmPassword, name } = formData;

	return (
		<Fragment>
			<form
				className="sign-up__form--instructor"
				onSubmit={(e) => {
					e.preventDefault();
					if (password !== confirmPassword) {
						return setAlert("passwords don't match", 'error');
					}

					register(e, formData);
				}}
			>
				<input
					type="email"
					className="large-input"
					name="email"
					placeholder="email"
					value={email}
					onChange={onChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					value={password}
					onChange={onChange}
				/>
				<input
					type="password"
					placeholder="confirm password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={onChange}
				/>
				<input
					type="text"
					name="name"
					placeholder="name"
					value={name}
					onChange={onChange}
				/>
				<input type="text" placeholder="access code" />
				<button className="btn btn--round large-input">Sign Up</button>
			</form>
		</Fragment>
	);
};

export default InstructorSignUp;
