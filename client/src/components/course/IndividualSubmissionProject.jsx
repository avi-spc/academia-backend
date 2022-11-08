import { connect } from 'react-redux';

import Chore from './Chore';
import ChoreAssignment from './student/ChoreAssignment';
import { useOutletContext, useParams } from 'react-router-dom';
import AssignmentSubmission from './student/AssignmentSubmission';

const IndividualSubmissionProject = ({ performance }) => {
	const { student_id, course_id } = useParams();
	const { individualCourse } = useOutletContext();

	const chore = individualCourse.course.project;

	const student = performance.studentsSubmitted.find((student) => {
		return student.student === student_id;
	});

	const course = student.performance.find((perf) => {
		return perf.course === course_id;
	});

	const submission = course.project;

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
	performance: state.performance
});

export default connect(mapStateToProps)(IndividualSubmissionProject);
