import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerInstructor } from '../../reduxStore/actions/auth';

const SignUp = ({ registerInstructor, auth: { isAuthenticated } }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/instructor/courses');
		}
	}, [isAuthenticated]);

	const register = (e) => {
		e.preventDefault();

		registerInstructor({ email, password, name });
	};

	const OnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [formData, setFormData] = useState({ email: '', password: '', name: '' });
	const { email, password, name } = formData;

	return (
		<div className="container-small">
			<div className="sign-up">
				<div className="logo">academia</div>
				<div className="account-type-tabs text-normal-SM">
					<div className="tab">Instructor</div>
					<div className="tab">Student</div>
				</div>
				<form className="sign-up__form--instructor" onSubmit={register}>
					<input
						type="email"
						name="email"
						placeholder="email"
						value={email}
						onChange={OnChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="password"
						value={password}
						onChange={OnChange}
					/>
					<input
						type="text"
						name="name"
						placeholder="name"
						value={name}
						onChange={OnChange}
					/>
					<input type="text" placeholder="access code" />
					<button className="btn btn--round">Sign Up</button>
				</form>
				{/* <form className="sign-up__form--student">
					<input type="text" placeholder="institute id" />
					<input type="password" placeholder="password" />
					<input type="text" placeholder="name" />
					<button>Sign Up</button>
				</form> */}
			</div>
			<button className="btn-alternate text-normal-M">
				Already have an account? <span className="text-normal-SM">Sign In</span>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { registerInstructor })(SignUp);
