import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginAccount } from '../../reduxStore/actions/auth';

import StudentSignIn from './StudentSignIn';
import InstructorSignIn from './InstructorSignIn';

const SignIn = ({ loginAccount, auth: { isAuthenticated, account } }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate(`/${account.type}/courses`);
		}
	}, [isAuthenticated]);

	const login = (e, account) => {
		e.preventDefault();

		loginAccount(account, accountType);
	};

	const [accountType, setAccountType] = useState('student');

	return (
		<div className="container-small">
			<div className="sign-in">
				<div className="logo">academia</div>
				<div className="account-type-tabs text-normal-SM">
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
			<button className="btn-alternate text-normal-M">
				Don't have an account? <span className="text-normal-SM">Sign Up</span>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loginAccount })(SignIn);
