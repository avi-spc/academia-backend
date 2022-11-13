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

	return (
		coursePerformance && (
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
					<button className="btn btn--round">View deatils</button>
				</div>
				<div className="chore__submission-details">
					{coursePerformance.project.team.length > 0 ? (
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
							<button className="btn btn--round">
								<a
									href={`http://localhost:5000/api/performance/submissions/file/${coursePerformance.project.documentId}`}
									target="_blank"
								>
									View submission
								</a>
							</button>
							{!coursePerformance.project.marksObtained && (
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
				{coursePerformance.project.team.length > 0 && (
					<div className="chore__project-details">
						<div className="chore__project-details__title text-medium-SB">
							{coursePerformance.project.title}
						</div>
						<div className="chore__project-details__synopsis">
							{coursePerformance.project.synopsis}
						</div>
						<button className="btn btn--round-sm">
							<span className="material-symbols-outlined">link</span>
							<div>Available At</div>
						</button>
					</div>
				)}
				{/* <button
					className="btn btn--round"
					onClick={() => {
						getStudentsEnrolled(course_id);
						togglePopup(!popup.isVisible);
					}}
				>
					Add team member
				</button> */}
				{/* {popup.isVisible && <SubmitProject courseId={course_id} projectId={projectId} />} */}
				{popup.isVisible && (
					<TeamMember
						courseId={course_id}
						teamMembers={coursePerformance.project.team.map((teamMember) => {
							return teamMember.student;
						})}
					/>
				)}
			</div>
		)
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
