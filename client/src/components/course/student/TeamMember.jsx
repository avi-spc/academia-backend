import { connect } from 'react-redux';

import {
	addProjectTeamMember,
	removeProjectTeamMember
} from '../../../reduxStore/actions/performance';

const TeamMember = ({
	addProjectTeamMember,
	removeProjectTeamMember,
	studentsEnrolled,
	performance,
	teamMembers,
	courseId
}) => {
	return (
		<div className="team-member">
			<div className="create-heading">Add team member</div>
			<form>
				<input type="text" placeholder="search student" />
			</form>
			<ul>
				{studentsEnrolled.map((student) => {
					if (student._id !== performance.student)
						return (
							<li key={student._id}>
								<div className="student-avatar"></div>
								<div className="student-name">{student.name}</div>
								<div className="student-institute-id">{student.instituteId}</div>
								{!teamMembers.includes(student._id) ? (
									<button
										onClick={() => addProjectTeamMember(courseId, student._id)}
									>
										Add
									</button>
								) : (
									<button
										onClick={() =>
											removeProjectTeamMember(courseId, student._id)
										}
									>
										Remove
									</button>
								)}
							</li>
						);
				})}
			</ul>
		</div>
	);
};

const mapStateToProps = (state) => ({
	studentsEnrolled: state.course.studentsEnrolled,
	performance: state.performance.performance
});

export default connect(mapStateToProps, { addProjectTeamMember, removeProjectTeamMember })(
	TeamMember
);
