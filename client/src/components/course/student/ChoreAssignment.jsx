const ChoreAssignment = () => {
	return (
		<div className="chore text-normal-M">
			<div className="chore__header">
				<span className="icon icon--light material-symbols-outlined">assignment</span>
				<div className="chore__header__title">STEM Assignment</div>
				<div className="chore__header__timestamp text-small-M">Posted 12:04 PM</div>
			</div>
			<div className="chore__details">
				<div>
					<label>Deadline</label>
					<div className="chore__details__deadline text-large-M">Jun 30 2022</div>
				</div>
				<div>
					<label>Points</label>
					<div className="chore__details__points text-large-M">30</div>
				</div>
				<button className="btn btn--round">View deatils</button>
			</div>
			<div className="chore__submission-details">
				{/* <div className="not-submitted">
					<div className="chore__submission-details__status">Not yet submitted</div>
					<button className="btn btn--round">View submission</button>
				</div> */}
				{/* <div className="submitted-graded"> */}
				<div>
					<label>Submitted on</label>
					<div className="chore__submission-details__deadline text-large-M">
						Jun 23 2022
					</div>
				</div>
				<div>
					<label>Obtained</label>
					<div className="chore__submission-details__points text-large-M">26</div>
				</div>
				<button className="btn btn--round">View submission</button>
				<button className="btn btn--round btn--danger">Withdraw</button>
				{/* </div> */}
			</div>
		</div>
	);
};

export default ChoreAssignment;
