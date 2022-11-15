import { Fragment } from 'react';
import { useForm } from '../../hooks/useForm';
import { setAlert } from '../../reduxStore/actions/alert';

const StudentSignUp = ({ register, setAlert }) => {
	const { formData, onChange } = useForm({
		instituteId: '',
		password: '',
		name: '',
		confirmPasswrod: ''
	});
	const { instituteId, password, confirmPassword, name } = formData;

	return (
		<Fragment>
			<form
				className="sign-up__form--student"
				onSubmit={(e) => {
					e.preventDefault();
					if (password !== confirmPassword) {
						return setAlert("passwords don't match", 'error');
					}

					register(e, { instituteId, password, name });
				}}
			>
				<input
					type="text"
					placeholder="institute id"
					name="instituteId"
					value={instituteId}
					onChange={onChange}
				/>
				<input
					type="text"
					placeholder="name"
					name="name"
					value={name}
					onChange={onChange}
				/>
				<input
					type="password"
					className="large-input"
					placeholder="password"
					name="password"
					value={password}
					onChange={onChange}
				/>
				<input
					type="password"
					className="large-input"
					placeholder="confirm password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={onChange}
				/>
				<button className="btn btn--round large-input">Sign Up</button>
			</form>
		</Fragment>
	);
};

export default StudentSignUp;
