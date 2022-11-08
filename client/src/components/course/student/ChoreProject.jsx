import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import SubmitProject from './SubmitProject';

const ChoreProject = ({ togglePopup, performance, popup }) => {
	const [projectId, setProjectId] = useState(null);

	return (
		<div className="chore text-normal-M">
			<div className="chore__header">
				<span className="icon icon--light material-symbols-outlined">assignment</span>
				<div className="chore__header__title">{performance.course.project.title}</div>
				<div className="chore__header__timestamp text-small-M">Posted 12:04 PM</div>
			</div>
			<div className="chore__details">
				<div>
					<label>Deadline</label>
					<div className="chore__details__deadline text-large-M">
						{performance.course.project.deadline}
					</div>
				</div>
				<div>
					<label>Points</label>
					<div className="chore__details__points text-large-M">
						{performance.course.project.maxMarks}
					</div>
				</div>
				<button className="btn btn--round">View deatils</button>
			</div>
			<div className="chore__submission-details">
				{performance.project.team.length > 0 ? (
					<Fragment>
						<div>
							<label>Submitted on</label>
							<div className="chore__submission-details__deadline text-large-M">
								{performance.project.createdAt}
							</div>
						</div>
						<div>
							<label>Obtained</label>
							<div className="chore__submission-details__points text-large-M">
								{'marksObtained' in performance.project
									? performance.project.marksObtained
									: 'NG'}
							</div>
						</div>
						<button className="btn btn--round">View submission</button>
						<button className="btn btn--round btn--danger">Withdraw</button>
					</Fragment>
				) : (
					<Fragment>
						<div className="chore__submission-details__status">Not yet submitted</div>
						<button
							className="btn btn--round"
							onClick={() => {
								togglePopup(!popup.isVisible);
								setProjectId(performance.course.project._id);
							}}
						>
							Submit
						</button>
					</Fragment>
				)}
			</div>
			{performance.project.team.length > 0 && (
				<div className="chore__project-details">
					<div className="chore__project-details__title text-normal-SM">
						{performance.project.title}
					</div>
					<div className="chore__project-details__synopsis">
						{performance.project.synopsis}
					</div>
					<button className="btn btn--round-sm">
						<span className="material-symbols-outlined">link</span>
						<div>Available At</div>
					</button>
				</div>
			)}
			{popup.isVisible && (
				<SubmitProject courseId={performance.course._id} projectId={projectId} />
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup
});

export default connect(mapStateToProps, { togglePopup })(ChoreProject);
