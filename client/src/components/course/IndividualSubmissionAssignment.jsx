import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';

import { getStudentPerformance } from '../../reduxStore/actions/performance';

import Chore from './Chore';
import ChoreAssignment from './student/ChoreAssignment';
import AssignmentSubmission from './student/AssignmentSubmission';

const IndividualSubmissionAssignment = ({ getStudentPerformance, performance }) => {
	const { assignment_id, student_id, course_id } = useParams();
	const { individualCourse } = useOutletContext();

	const [submission, setSubmission] = useState(null);

	useEffect(() => {
		getStudentPerformance(student_id);
	}, [student_id]);

	useEffect(() => {
		if (performance) {
			setSubmission(
				performance.performance
					.find((perf) => {
						return perf.course._id === course_id;
					})
					.assignments.find((assignment) => {
						return assignment.id === assignment_id;
					})
			);
		}
	}, [performance]);

	const chore = individualCourse.course.assignments.find((assignment) => {
		return assignment._id === assignment_id;
	});

	return (
		submission && (
			<div className="chore-submission">
				<div className="chore-submission__details">
					<div className="chore-submission__details__heading">Details</div>
					<Chore courseId={individualCourse.course._id} chore={chore} />
				</div>
				<div className="chore-submission__individual-submission">
					<div className="chore-submission__individual-submission__heading">
						Submission
					</div>
					<AssignmentSubmission submission={submission} />
					<button>Grade</button>
				</div>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	performance: state.performance.performance
});

export default connect(mapStateToProps, { getStudentPerformance })(IndividualSubmissionAssignment);
