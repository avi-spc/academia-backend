const SignIn = () => {
	return (
		<div className="container-small">
			<div className="sign-in">
				<div className="logo">academia</div>
				<div className="account-type-tabs text-normal-SM">
					<div className="tab">Instructor</div>
					<div className="tab">Student</div>
				</div>
				<form className="sign-in__form--instructor">
					<input type="email" placeholder="email" />
					<input type="password" placeholder="password" />
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

export default SignIn;
