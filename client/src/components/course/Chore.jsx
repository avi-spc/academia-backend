const Chore = ({ chore }) => {
	return (
		<div className="chore text-normal-M">
			<div className="chore__header">
				<span className="icon icon--light material-symbols-outlined">assignment</span>
				<div className="chore__header__title">{chore.title}</div>
				<div className="chore__header__timestamp text-small-M">Posted 12:04 PM</div>
			</div>
			<div className="chore__details">
				<div>
					<label>Deadline</label>
					<div className="chore__details__deadline text-large-M">{chore.deadline}</div>
				</div>
				<div>
					<label>Points</label>
					<div className="chore__details__points text-large-M">{chore.maxMarks}</div>
				</div>
				<button className="btn btn--round">View deatils</button>
			</div>
		</div>
	);
};

export default Chore;
