import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import {
	addProjectTeamMember,
	removeProjectTeamMember
} from '../../../reduxStore/actions/performance';
import { togglePopup } from '../../../reduxStore/actions/popus';

const TeamMember = ({
	addProjectTeamMember,
	removeProjectTeamMember,
	togglePopup,
	studentsEnrolled,
	performance,
	teamMembers,
	courseId,
	setTeamPopup
}) => {
	const [searchedStudents, setSearchedStudents] = useState([]);
	const [searchString, setSearchString] = useState('');

	useEffect(() => {
		if (searchString.length > 0) {
			setSearchedStudents(
				studentsEnrolled.filter((student) => {
					return (
						student.name.startsWith(searchString) ||
						student.instituteId.startsWith(searchString)
					);
				})
			);
		} else {
			setSearchedStudents(studentsEnrolled);
		}
	}, [studentsEnrolled, searchString]);

	return (
		<div className="popup">
			<div className="create-chore container-medium">
				<div className="create-heading text-medium-SB">Add team member</div>
				<form className="create__form">
					<input
						type="text"
						placeholder="search student"
						className="team-member"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
					/>
				</form>
				<ul className="enrolled-students-list">
					{searchedStudents.map((student) => {
						if (student._id !== performance.student)
							return (
								<li className="enrolled-student" key={student._id}>
									<div>
										<div className="student-avatar"></div>
										<div className="student-name text-medium-M">
											{student.name}
										</div>
										<div className="student-institute-id text-normal-R">
											{student.instituteId}
										</div>
									</div>
									{!teamMembers.includes(student._id) ? (
										<button
											className="btn btn--capsule-sm"
											onClick={() =>
												addProjectTeamMember(courseId, student._id)
											}
										>
											Add
										</button>
									) : (
										<button
											className="btn btn--capsule-sm"
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
				<div className="create__cta">
					<button className="btn btn--cancel" onClick={() => setTeamPopup(false)}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	studentsEnrolled: state.course.studentsEnrolled,
	performance: state.performance.performance
});

export default connect(mapStateToProps, {
	addProjectTeamMember,
	removeProjectTeamMember,
	togglePopup
})(TeamMember);
