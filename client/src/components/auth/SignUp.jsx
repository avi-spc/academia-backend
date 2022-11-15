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
					<StudentSignUp register={register} />
				) : (
					<InstructorSignUp register={register} />
				)}
				<Link to="/">
					<button className="btn-alternate text-normal-R">
						Already have an account? <span className="text-medium-SB">Sign In</span>
					</button>
				</Link>
			</div>

			<img
				src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c25a4b4d-abf9-45fd-a5fb-87a7734647ce/df73ovd-847997c0-2c3f-416b-be10-8a3c9108fdb4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyNWE0YjRkLWFiZjktNDVmZC1hNWZiLTg3YTc3MzQ2NDdjZVwvZGY3M292ZC04NDc5OTdjMC0yYzNmLTQxNmItYmUxMC04YTNjOTEwOGZkYjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.isWsyycF1rMzYkA0LFyEYtD2r4cRuCdbQAqKIMVbp0o"
				className="side-image"
				alt=""
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { registerAccount })(SignUp);

{
	/*  */
}
