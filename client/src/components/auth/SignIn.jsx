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
		<div className="container-small">
			<div className="sign-in">
				<div className="logo">academia</div>
				<div className="account-type-tabs text-medium-M">
					<div className="tab" onClick={() => setAccountType('instructor')}>
						Instructor
					</div>
					<div className="tab" onClick={() => setAccountType('student')}>
						Student
					</div>
				</div>
				{accountType === 'student' ? (
					<StudentSignIn login={login} />
				) : (
					<InstructorSignIn login={login} />
				)}
			</div>
			<Link to="/register">
				<button className="btn-alternate text-medium-R">
					Don't have an account? <span className="text-medium-SB">Sign Up</span>
				</button>
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loginAccount })(SignIn);
