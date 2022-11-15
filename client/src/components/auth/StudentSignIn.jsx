import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

const StudentSignIn = ({ login }) => {
	const { formData, onChange } = useForm({ instituteId: '', password: '' });
	const { instituteId, password } = formData;

	return (
		<Fragment>
			<form className="sign-in__form--student" onSubmit={(e) => login(e, formData)}>
				<input
					type="text"
					className="large-input"
					name="instituteId"
					placeholder="institute id"
					value={instituteId}
					onChange={onChange}
				/>
				<input
					type="password"
					className="large-input"
					name="password"
					placeholder="password"
					value={password}
					onChange={onChange}
				/>
				<button className="btn btn--round large-input">Sign In</button>
			</form>
		</Fragment>
	);
};

export default StudentSignIn;
