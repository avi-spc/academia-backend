const AssignmentSubmission = ({ submission }) => {
	return (
		<div className="chore text-normal-M">
			<div className="chore__header">
				<span className="icon icon--light material-symbols-outlined">assignment</span>
				<div className="chore__header__title">{submission.title}</div>
				<div className="chore__header__timestamp text-small-M">Posted 12:04 PM</div>
			</div>
			<div className="chore__details">
				<div>
					<label>Submitted on</label>
					<div className="chore__details__deadline text-large-M">
						{submission.createdAt}
					</div>
				</div>
				<div>
					<label>Obtained</label>
					<div className="chore__details__points text-large-M">
						{'marksObtained' in submission ? submission.marksObtained : 'NG'}
					</div>
				</div>
				<button className="btn btn--round">View submission</button>
			</div>
		</div>
	);
};

export default AssignmentSubmission;
