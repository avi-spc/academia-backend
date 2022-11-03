const SignIn = () => {
	return (
		<div className="container">
			<div className="sign-in">
				<div className="logo">academia</div>
				<div className="account-type-tabs">
					<div className="tab">Instructor</div>
					<div className="tab">Student</div>
				</div>
				<form className="sign-in__form--instructor">
					<input type="email" placeholder="email" />
					<input type="password" placeholder="password" />
					<button>Sign In</button>
				</form>
				<form className="sign-in__form--student">
					<input type="text" placeholder="institute id" />
					<input type="password" placeholder="password" />
					<button>Sign In</button>
				</form>
			</div>
			<button>
				Don't have an account? <span>Sign Up</span>
			</button>
		</div>
	);
};

export default SignIn;
