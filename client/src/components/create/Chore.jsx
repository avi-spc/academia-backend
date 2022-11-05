const Chore = () => {
	return (
		<div className="create-chore container-medium text-normal-M">
			<div className="create-heading text-large-SM">New chore</div>
			<form className="create__form">
				<label className="doc-label" htmlFor="doc-file">
					<span>Upload file</span>
				</label>
				<input type="file" id="doc-file" className="doc-file" />
				<label>Title</label>
				<input type="text" className="title" />
				<label>Deadline</label>
				<input type="date" className="deadline" />
				<label>Points</label>
				<input type="text" className="points" />
			</form>
			<div className="create__cta">
				<button className="btn btn--round">Create</button>
				<button className="btn btn--round">Cancel</button>
			</div>
		</div>
	);
};

export default Chore;
