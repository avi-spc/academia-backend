const Announcement = () => {
	return (
		<div className="create-announcement container-medium text-normal-M">
			<div className="create-heading text-large-SM">New announcement</div>
			<form className="create__form">
				<label>Title</label>
				<input type="text" className="title" />
				<label>Message</label>
				<textarea className="message" rows="5" />
			</form>
			<div className="create__cta">
				<button className="btn btn--round">Create</button>
				<button className="btn btn--round">Cancel</button>
			</div>
		</div>
	);
};

export default Announcement;
