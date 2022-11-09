import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import { getPerformance, unsubmitProject } from '../../../reduxStore/actions/performance';

import SubmitProject from './SubmitProject';

const ChoreProject = ({ getPerformance, unsubmitProject, togglePopup, performance, popup }) => {
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
			<div className="chore text-normal-M">
				<div className="chore__header">
					<span className="icon icon--light material-symbols-outlined">assignment</span>
					<div className="chore__header__title">
						{coursePerformance.course.project.title}
					</div>
					<div className="chore__header__timestamp text-small-M">Posted 12:04 PM</div>
				</div>
				<div className="chore__details">
					<div>
						<label>Deadline</label>
						<div className="chore__details__deadline text-large-M">
							{coursePerformance.course.project.deadline}
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
									{coursePerformance.project.createdAt}
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
							<button className="btn btn--round">View submission</button>
							<button
								className="btn btn--round btn--danger"
								onClick={() =>
									unsubmitProject(course_id, coursePerformance.project.documentId)
								}
							>
								Withdraw
							</button>
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
						<div className="chore__project-details__title text-normal-SM">
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
				{popup.isVisible && <SubmitProject courseId={course_id} projectId={projectId} />}
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	performance: state.performance.performance
});

export default connect(mapStateToProps, { togglePopup, getPerformance, unsubmitProject })(
	ChoreProject
);
