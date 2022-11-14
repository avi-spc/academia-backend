import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import { getPerformance, unsubmitProject } from '../../../reduxStore/actions/performance';
import { getStudentsEnrolled } from '../../../reduxStore/actions/course';

import SubmitProject from './SubmitProject';
import TeamMember from './TeamMember';

const ChoreProject = ({
	getPerformance,
	unsubmitProject,
	togglePopup,
	getStudentsEnrolled,
	performance,
	popup
}) => {
	const { course_id } = useParams();

	const [projectId, setProjectId] = useState(null);
	const [coursePerformance, setCoursePerformance] = useState(null);
	const [teamPopup, setTeamPopup] = useState(false);

	useEffect(() => {
		getPerformance();
	}, [course_id]);

	useEffect(() => {
		if (performance) {
			setCoursePerformance(
				performance.performance.find((perf) => {
					return perf.course._id === course_id;
				})
			);
		}
	}, [performance]);

	return coursePerformance && 'project' in coursePerformance.course ? (
		<Fragment>
			<div className="chore text-medium-R">
				<div className="chore__header">
					<span className="icon icon--light material-symbols-outlined">assignment</span>
					<div className="chore__header__title text-medium-SB">
						{coursePerformance.course.project.title}
					</div>
					<div className="chore__header__timestamp text-small-R">Posted 12:04 PM</div>
				</div>
				<div className="chore__details">
					<div>
						<label>Deadline</label>
						<div className="chore__details__deadline text-large-M">
							{coursePerformance.course.project.deadline.substring(0, 10)}
						</div>
					</div>
					<div>
						<label>Points</label>
						<div className="chore__details__points text-large-M">
							{coursePerformance.course.project.maxMarks}
						</div>
					</div>
					<a
						className="btn btn--round"
						href={`http://localhost:5000/api/performance/submissions/file/${coursePerformance.course.project.documentId}`}
						target="_blank"
					>
						View details
					</a>
				</div>
				<div className="chore__submission-details">
					{coursePerformance.project && 'id' in coursePerformance.project ? (
						<Fragment>
							<div>
								<label>Submitted on</label>
								<div className="chore__submission-details__deadline text-large-M">
									{coursePerformance.project.createdAt.substring(0, 10)}
								</div>
							</div>
							<div>
								<label>Obtained</label>
								<div className="chore__submission-details__points text-large-M">
									{'marksObtained' in coursePerformance.project
										? coursePerformance.project.marksObtained
										: 'NG'}
								</div>
							</div>
							<a
								className="btn btn--round"
								href={`http://localhost:5000/api/performance/submissions/file/${coursePerformance.project.documentId}`}
								target="_blank"
							>
								View submission
							</a>
							{!('marksObtained' in coursePerformance.project) && (
								<button
									className="btn btn--round btn--danger"
									onClick={() =>
										unsubmitProject(
											course_id,
											coursePerformance.project.documentId
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
									setProjectId(coursePerformance.course.project._id);
								}}
							>
								Submit
							</button>
						</Fragment>
					)}
				</div>
				{coursePerformance.project && 'id' in coursePerformance.project && (
					<div className="chore__project-details">
						<div className="chore__project-details__title text-medium-SB">
							{coursePerformance.project.title}
						</div>
						<div className="chore__project-details__synopsis">
							{coursePerformance.project.synopsis}
						</div>
						<div className="text-medium-SB">Team</div>
						<div className="chore__project-details__team">
							{coursePerformance.project.team.map((member) => {
								return (
									<div className="team-member" key={member.student._id}>
										{member.student.instituteId}
									</div>
								);
							})}
						</div>
						<button className="btn btn--round-sm">
							<span className="material-symbols-outlined">link</span>
							<div>Available At</div>
						</button>
					</div>
				)}
				{popup.isVisible && <SubmitProject courseId={course_id} projectId={projectId} />}
				{teamPopup && (
					<TeamMember
						setTeamPopup={setTeamPopup}
						courseId={course_id}
						teamMembers={coursePerformance.project.team.map((teamMember) => {
							return teamMember.student._id;
						})}
					/>
				)}
			</div>
			{coursePerformance.project && 'id' in coursePerformance.project && (
				<button
					className="btn btn--round btn-team-member"
					onClick={() => {
						getStudentsEnrolled(course_id);
						setTeamPopup(!teamPopup);
					}}
				>
					Add team member
				</button>
			)}
		</Fragment>
	) : (
		<div className="empty-list text-medium-R center">No poject for this course yet</div>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	performance: state.performance.performance
});

export default connect(mapStateToProps, {
	togglePopup,
	getPerformance,
	unsubmitProject,
	getStudentsEnrolled
})(ChoreProject);
