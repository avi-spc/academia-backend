const Discussion = () => {
	return (
		<div className="create-discussion container-medium text-normal-M">
			<div className="create-heading text-large-SM">New discussion</div>
			<form className="create__form">
				<label>Issue</label>
				<textarea className="issue" rows="5" />
			</form>
			<div className="create__cta">
				<button className="btn btn--round">Create</button>
				<button className="btn btn--round">Cancel</button>
			</div>
		</div>
	);
};

export default Discussion;
