const Chore = () => {
	return (
		<div className="chore text-normal-M">
			<div className="chore__header">
				<span class="icon icon--light material-symbols-outlined">assignment</span>
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
		</div>
	);
};

export default Chore;
