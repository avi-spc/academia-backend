import Chore from './Chore';
import ChoreAssignment from './student/ChoreAssignment';

const IndividualSubmissionAssignment = () => {
	return (
		<div className="chore-submission">
			<div className="chore-submission__details">
				<div className="chore-submission__details__heading">Details</div>
				<Chore />
			</div>
			<div className="chore-submission__individual-submission">
				<div className="chore-submission__individual-submission__heading">Submission</div>
				<ChoreAssignment />
				<button>Grade</button>
			</div>
		</div>
	);
};

export default IndividualSubmissionAssignment;
