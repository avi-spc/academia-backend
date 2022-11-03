import Chore from './Chore';

const ChoreSubmissions = () => {
	return (
		<div className="chore-submission">
			<div className="chore-submission__details">
				<div className="chore-submission__details__heading">Details</div>
				<Chore />
			</div>
			<div className="chore-submission__submissions">
				<div className="chore-submission__submissions__heading">Submissions</div>
				<ul className="chore-submission__submissions__students-list">
					<li>
						<div className="student-institute-id"></div>
						<div className="grade-status"></div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ChoreSubmissions;
