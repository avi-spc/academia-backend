import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginInstructor } from '../../reduxStore/actions/auth';

const SignIn = ({ loginInstructor, auth: { isAuthenticated } }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/instructor/courses');
		}
	}, [isAuthenticated]);

	const login = (e) => {
		e.preventDefault();

		loginInstructor({ email, password });
	};

	const OnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [formData, setFormData] = useState({ email: '', password: '' });
	const { email, password } = formData;

	return (
		<div className="container-small">
			<div className="sign-in">
				<div className="logo">academia</div>
				<div className="account-type-tabs text-normal-SM">
					<div className="tab">Instructor</div>
					<div className="tab">Student</div>
				</div>
				<form className="sign-in__form--instructor" onSubmit={login}>
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
					<button className="btn btn--round">Sign In</button>
				</form>
				{/* <form className="sign-in__form--student">
					<input type="text" placeholder="institute id" />
					<input type="password" placeholder="password" />
					<button>Sign In</button>
				</form> */}
			</div>
			<button className="btn-alternate text-normal-M">
				Don't have an account? <span className="text-normal-SM">Sign Up</span>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loginInstructor })(SignIn);
