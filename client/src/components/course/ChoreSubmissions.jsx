import { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { getStudents } from '../../reduxStore/actions/performance';

import Chore from './Chore';
import SubmissionsDocket from './SubmissionsDocket';

const ChoreSubmissions = ({ getStudents, performance }) => {
	const { chore_id, chore_type } = useParams();
	const { individualCourse } = useOutletContext();

	const chore =
		chore_type === 'assignment'
			? individualCourse.course.assignments.find((assignment) => {
					return assignment._id === chore_id;
			  })
			: individualCourse.course.project;

	useEffect(() => {
		getStudents(chore_id, chore_type);
	}, [chore_id]);

	return (
		chore && (
			<div className="chore-submission">
				<div className="chore-submission__details">
					<div className="chore-submission__details__heading text-large-M">Details</div>
					<Chore courseId={individualCourse.course._id} chore={chore} />
				</div>
				<div className="chore-submission__submissions">
					<div className="chore-submission__submissions__heading text-large-M">
						Submissions
					</div>
					<SubmissionsDocket
						students={performance.studentsSubmitted}
						choreId={chore._id}
						courseId={individualCourse.course._id}
						choreType={chore_type}
					/>
					{/* <ul className="chore-submission__submissions__students-list"> */}
					{/* {performance.studentsSubmitted.map((student) => (
							<li key={student.student}>
								<div className="student-institute-id">{student.student}</div>
								<div className="grade-status"></div>
							</li>
						))} */}
					{/* </ul> */}
				</div>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	performance: state.performance
});

export default connect(mapStateToProps, { getStudents })(ChoreSubmissions);
