import Announcement from './Announcement';
import Chore from './Chore';
import ChoreAssignment from './student/ChoreAssignment';
import ChoreProject from './student/ChoreProject';
import Discussion from './student/Discussion';
import StudyMaterial from './StudyMaterial';
import SubmissionsDocket from './SubmissionsDocket';

const IndividualCourse = () => {
	return (
		<div className="container-large individual-course">
			<div className="individual-course__banner">
				<div className="individual-course__banner__thumbnail"></div>
				<div className="individual-course__banner__name text-extra-large-SM">Calculus</div>
				<div className="individual-course__banner__code text-large-M">CS201</div>
				<div className="individual-course__banner__access">
					<span className="access-code text-normal-sparsed-M">ac3t8</span>
					<span className="icon icon--light material-symbols-outlined">content_copy</span>
				</div>
			</div>
			<div className="individual-course__work">
				<div className="individual-course__work__category text-medium-M">
					<div>Assignments</div>
					<span className="material-symbols-outlined">arrow_drop_down_circle</span>
				</div>
				<div className="individual-course__work__chore-p-create">
					<button className="btn btn--capsule create">
						<span className="material-symbols-outlined">add_circle</span>Create
					</button>
					<ul className="individual-course__work__list">
						<li>
							<ChoreAssignment />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default IndividualCourse;
