import { Link } from 'react-router-dom';

const SubmissionsDocket = ({ students, choreId, courseId, choreType }) => {
	return (
		<div className="submissions-docket">
			{students.map((student) => (
				<Link
					to={`/instructor/courses/${courseId}/submission/${student.student}/${choreType}/${choreId}`}
					className="submissions-docket__submission"
					key={student.student}
				>
					<div className="submissions-docket__submission__student-institute-id text-normal-M">
						{student._id}
					</div>
					<div className="submissions-docket__submission__grade-status text-small-M">
						Not graded
					</div>
				</Link>
			))}
		</div>
	);
};

export default SubmissionsDocket;
