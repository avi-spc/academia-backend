const Course = () => {
	return (
		<div className="create-course container-medium text-normal-M">
			<div className="create-heading text-large-SM">New course</div>
			<form className="create__form">
				<label>Code</label>
				<input type="text" className="code" />
				<label>Credits</label>
				<input type="text" className="credits" />
				<label>Name</label>
				<input type="text" className="name" />
			</form>
			<div className="create__cta">
				<button className="btn btn--round">Create</button>
				<button className="btn btn--round">Cancel</button>
			</div>
		</div>
	);
};

export default Course;
