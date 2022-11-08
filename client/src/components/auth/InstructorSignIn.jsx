import { Fragment } from 'react';

import { useForm } from '../../hooks/useForm';

const InstructorSignIn = ({ login }) => {
	const { formData, onChange } = useForm({ email: '', password: '' });
	const { email, password } = formData;

	return (
		<Fragment>
			<form className="sign-in__form--instructor" onSubmit={(e) => login(e, formData)}>
				<input
					type="email"
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
				<button className="btn btn--round">Sign In</button>
			</form>
		</Fragment>
	);
};

export default InstructorSignIn;
