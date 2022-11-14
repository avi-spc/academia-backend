import { Link } from 'react-router-dom';

const SubmissionsDocket = ({ students, choreId, courseId, choreType }) => {
	return (
		<div className="submissions-docket">
			{students.map((student) => (
				<Link
					to={`/courses/${courseId}/submission/${student.student._id}/${choreType}/${choreId}`}
					className="submissions-docket__submission"
					key={student.student._id}
				>
					<div className="submissions-docket__submission__student-institute-id text-medium-M">
						{student.student.instituteId}
					</div>
					{/* <div className="submissions-docket__submission__grade-status text-small-M">
						Not graded
					</div> */}
				</Link>
			))}
		</div>
	);
};

export default SubmissionsDocket;
