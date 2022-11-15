import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerAccount } from '../../reduxStore/actions/auth';
import { setAlert } from '../../reduxStore/actions/alert';
import StudentSignUp from './StudentSignUp';
import InstructorSignUp from './InstructorSignUp';

const SignUp = ({ registerAccount, setAlert, auth: { isAuthenticated, loading } }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && isAuthenticated) {
			navigate('/courses');
		}
	}, [isAuthenticated, loading]);

	const register = (e, account) => {
		e.preventDefault();

		registerAccount(account, accountType);
	};

	const [accountType, setAccountType] = useState('student');

	return (
		<div className="auth-parent">
			<div className="sign-up">
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
					<StudentSignUp register={register} setAlert={setAlert} />
				) : (
					<InstructorSignUp register={register} setAlert={setAlert} />
				)}
				<Link to="/">
					<button className="btn-alternate text-normal-R">
						Already have an account? <span className="text-medium-SB">Sign In</span>
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

export default connect(mapStateToProps, { registerAccount, setAlert })(SignUp);
