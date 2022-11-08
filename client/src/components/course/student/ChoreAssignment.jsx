import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';

import SubmitAssignment from './SubmitAssignment';

const ChoreAssignment = ({ togglePopup, performance, popup }) => {
	const [assignmentId, setAssignmentId] = useState(null);

	const performanceObject = performance.course.assignments.map((assignment) => {
		return {
			assignment,
			submission: performance.assignments.find((submittedAssignment) => {
				return submittedAssignment.id === assignment._id;
			})
		};
	});

	return (
		<Fragment>
			{performanceObject.map(({ assignment, submission }) => (
				<div className="chore text-normal-M">
					<div className="chore__header">
						<span className="icon icon--light material-symbols-outlined">
							assignment
						</span>
						<div className="chore__header__title">{assignment.title}</div>
						<div className="chore__header__timestamp text-small-M">Posted 12:04 PM</div>
					</div>
					<div className="chore__details">
						<div>
							<label>Deadline</label>
							<div className="chore__details__deadline text-large-M">
								{assignment.deadline}
							</div>
						</div>
						<div>
							<label>Points</label>
							<div className="chore__details__points text-large-M">
								{assignment.maxMarks}
							</div>
						</div>
						<button className="btn btn--round">View deatils</button>
					</div>
					<div className="chore__submission-details">
						{submission ? (
							<Fragment>
								<div>
									<label>Submitted on</label>
									<div className="chore__submission-details__deadline text-large-M">
										{submission.createdAt}
									</div>
								</div>
								<div>
									<label>Obtained</label>
									<div className="chore__submission-details__points text-large-M">
										{'marksObtained' in submission
											? submission.marksObtained
											: 'NG'}
									</div>
								</div>
								<button className="btn btn--round">View submission</button>
								<button className="btn btn--round btn--danger">Withdraw</button>
							</Fragment>
						) : (
							<Fragment>
								<div className="chore__submission-details__status">
									Not yet submitted
								</div>
								<button
									className="btn btn--round"
									onClick={() => {
										togglePopup(!popup.isVisible);
										setAssignmentId(assignment._id);
									}}
								>
									Submit
								</button>
							</Fragment>
						)}
					</div>
				</div>
			))}
			{popup.isVisible && (
				<SubmitAssignment courseId={performance.course._id} assignmentId={assignmentId} />
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup
});

export default connect(mapStateToProps, { togglePopup })(ChoreAssignment);
