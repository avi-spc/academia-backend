import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import { getPerformance, unsubmitAssignment } from '../../../reduxStore/actions/performance';

import SubmitAssignment from './SubmitAssignment';

const ChoreAssignment = ({
	getPerformance,
	unsubmitAssignment,
	togglePopup,
	performance,
	popup
}) => {
	const { course_id } = useParams();

	const [assignmentId, setAssignmentId] = useState(null);
	const [performanceObject, setPerformanceObject] = useState(null);
	const [coursePerformance, setCoursePerformance] = useState(null);

	useEffect(() => {
		getPerformance();
	}, [course_id]);

	useEffect(() => {
		if (coursePerformance) {
			setPerformanceObject(
				coursePerformance.course.assignments.map((assignment) => {
					return {
						assignment,
						submission: coursePerformance.assignments.find((submittedAssignment) => {
							return submittedAssignment.id === assignment._id;
						})
					};
				})
			);
		}
	}, [coursePerformance]);

	useEffect(() => {
		if (performance) {
			setCoursePerformance(
				performance.performance.find((perf) => {
					return perf.course._id === course_id;
				})
			);
		}
	}, [performance]);

	return (
		performanceObject && (
			<Fragment>
				{performanceObject.map(({ assignment, submission }) => (
					<li className="chore text-normal-M">
						<div className="chore__header">
							<span className="icon icon--light material-symbols-outlined">
								assignment
							</span>
							<div className="chore__header__title">{assignment.title}</div>
							<div className="chore__header__timestamp text-small-M">
								Posted 12:04 PM
							</div>
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
									{!submission.marksObtained && (
										<button
											className="btn btn--round btn--danger"
											onClick={() =>
												unsubmitAssignment(
													course_id,
													submission.id,
													submission.documentId
												)
											}
										>
											Withdraw
										</button>
									)}
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
					</li>
				))}
				{popup.isVisible && (
					<SubmitAssignment courseId={course_id} assignmentId={assignmentId} />
				)}
			</Fragment>
		)
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	performance: state.performance.performance
});

export default connect(mapStateToProps, { togglePopup, getPerformance, unsubmitAssignment })(
	ChoreAssignment
);
