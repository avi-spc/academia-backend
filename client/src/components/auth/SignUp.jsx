import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerAccount } from '../../reduxStore/actions/auth';
import StudentSignUp from './StudentSignUp';
import InstructorSignUp from './InstructorSignUp';

const SignUp = ({ registerAccount, auth: { isAuthenticated, loading } }) => {
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
		<div className="container-small">
			<div className="sign-up">
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
					<StudentSignUp register={register} />
				) : (
					<InstructorSignUp register={register} />
				)}
			</div>
			<Link to="/">
				<button className="btn-alternate text-medium-R">
					Already have an account? <span className="text-medium-SB">Sign In</span>
				</button>
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { registerAccount })(SignUp);
