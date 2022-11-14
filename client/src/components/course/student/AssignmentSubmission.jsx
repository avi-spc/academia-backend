const AssignmentSubmission = ({ studentId, submission }) => {
	return (
		<div className="chore text-medium-R">
			<div className="chore__header">
				<span className="icon icon--light material-symbols-outlined">assignment</span>
				<div className="chore__header__title text-medium-SB">{studentId}</div>
				<div className="chore__header__timestamp text-small-R">Posted 12:04 PM</div>
			</div>
			<div className="chore__details">
				<div>
					<label>Submitted on</label>
					<div className="chore__details__deadline text-large-M">
						{submission.createdAt.substring(0, 10)}
					</div>
				</div>
				<div>
					<label>Obtained</label>
					<div className="chore__details__points text-large-M">
						{'marksObtained' in submission ? submission.marksObtained : 'NG'}
					</div>
				</div>
				<a
					className="btn btn--round"
					href={`http://localhost:5000/api/performance/submissions/file/${submission.documentId}`}
					target="_blank"
				>
					View submission
				</a>
			</div>
		</div>
	);
};

export default AssignmentSubmission;
