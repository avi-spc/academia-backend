const SignUp = () => {
	return (
		<div className="container">
			<div className="sign-up">
				<div className="logo">academia</div>
				<div className="account-type-tabs">
					<div className="tab">Instructor</div>
					<div className="tab">Student</div>
				</div>
				<form className="sign-up__form--instructor">
					<input type="email" placeholder="email" />
					<input type="password" placeholder="password" />
					<input type="text" placeholder="name" />
					<input type="text" placeholder="access code" />
					<button>Sign Up</button>
				</form>
				<form className="sign-up__form--student">
					<input type="text" placeholder="institute id" />
					<input type="password" placeholder="password" />
					<input type="text" placeholder="name" />
					<button>Sign Up</button>
				</form>
			</div>
			<button>
				Already have an account? <span>Sign In</span>
			</button>
		</div>
	);
};

export default SignUp;
