import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';

import { getStudentPerformance, gradeProject } from '../../reduxStore/actions/performance';

import Chore from './Chore';
import ChoreAssignment from './student/ChoreAssignment';
import AssignmentSubmission from './student/AssignmentSubmission';

const IndividualSubmissionProject = ({ getStudentPerformance, gradeProject, performance }) => {
	const { student_id, course_id } = useParams();
	const { individualCourse } = useOutletContext();

	const [submission, setSubmission] = useState(null);

	useEffect(() => {
		getStudentPerformance(student_id);
	}, [student_id]);

	useEffect(() => {
		if (performance) {
			setSubmission(
				performance.performance.find((perf) => {
					return perf.course._id === course_id;
				}).project
			);
		}
	}, [performance]);

	const chore = individualCourse.course.project;

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
					<button
						className="btn btn--round"
						onClick={() => gradeProject({ marks: 20 }, student_id, course_id)}
					>
						Grade
					</button>
				</div>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	performance: state.performance.performance
});

export default connect(mapStateToProps, { getStudentPerformance, gradeProject })(
	IndividualSubmissionProject
);
