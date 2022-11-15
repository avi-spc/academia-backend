import { Fragment } from 'react';

import { useForm } from '../../hooks/useForm';

const InstructorSignUp = ({ register }) => {
	const { formData, onChange } = useForm({ email: '', password: '', name: '' });
	const { email, password, name } = formData;

	return (
		<Fragment>
			<form className="sign-up__form--instructor" onSubmit={(e) => register(e, formData)}>
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
				<input type="text" placeholder="confirm password" />
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
