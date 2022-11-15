import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginAccount } from '../../reduxStore/actions/auth';

import StudentSignIn from './StudentSignIn';
import InstructorSignIn from './InstructorSignIn';

const SignIn = ({ loginAccount, auth: { isAuthenticated, loading } }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && isAuthenticated) {
			navigate('/courses');
		}
	}, [isAuthenticated, loading]);

	const login = (e, account) => {
		e.preventDefault();

		loginAccount(account, accountType);
	};

	const [accountType, setAccountType] = useState('student');

	return (
		<div className="auth-parent">
			<div className="sign-in">
				<div className="logo">academia</div>
				<div className="account-type-tabs text-medium-M">
					<div
						className={accountType === 'instructor' ? 'active-tab' : 'tab'}
						onClick={() => setAccountType('instructor')}
					>
						Instructor
					</div>
					<div
						className={accountType === 'student' ? 'active-tab' : 'tab'}
						onClick={() => setAccountType('student')}
					>
						Student
					</div>
				</div>
				{accountType === 'student' ? (
					<StudentSignIn login={login} />
				) : (
					<InstructorSignIn login={login} />
				)}
				<Link to="/register">
					<button className="btn-alternate text-normal-R">
						Don't have an account? <span className="text-medium-SB">Sign Up</span>
					</button>
				</Link>
			</div>
			<img
				src="https://images.unsplash.com/photo-1635424239131-32dc44986b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
				className="side-image"
				alt=""
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loginAccount })(SignIn);
