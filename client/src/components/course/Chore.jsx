const Chore = () => {
	return (
		<div className="chore">
			<div className="chore__header">
				<span className="chore__header__icon"></span>
				<div className="chore__header__title"></div>
				<div className="chore__header__timestamp"></div>
			</div>
			<div className="chore__details">
				<label>Deadline</label>
				<div className="chore__details__deadline"></div>
				<label>Points</label>
				<div className="chore__details__points"></div>
				<button>View deatils</button>
			</div>
		</div>
	);
};

export default Chore;
