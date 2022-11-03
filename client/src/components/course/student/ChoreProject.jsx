const ChoreProject = () => {
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
			<div className="chore__submission-details">
				<div className="not-submitted">
					<div className="chore__submission-details__status"></div>
					<button>View submission</button>
				</div>
				<div className="submitted-graded">
					<label>Submitted on</label>
					<div className="chore__submission-details__deadline"></div>
					<label>Obtained</label>
					<div className="chore__submission-details__points"></div>
					<button>View submission</button>
					<div className="chore__submission-details__remarks"></div>
				</div>
				<div className="submitted-not-graded">
					<label>Submitted on</label>
					<div className="chore__submission-details__deadline"></div>
					<label>Obtained</label>
					<div className="chore__submission-details__points"></div>
					<button>View submission</button>
					<button>Withdraw</button>
				</div>
			</div>
			<div className="chore__project-details">
				<div className="chore__project-details__title"></div>
				<div className="chore__project-details__synopsis"></div>
				<button>Available at</button>
			</div>
		</div>
	);
};

export default ChoreProject;
