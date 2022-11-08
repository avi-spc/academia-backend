import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { getIndividualCourse, getAnnouncements } from '../../reduxStore/actions/course';

import StudyMaterialDocket from './StudyMaterialDocket';
import ChoreDocket from './ChoreDocket';
import ChoreAssignment from './student/ChoreAssignment';
import ChoreProject from './student/ChoreProject';

const IndividualCourse = ({
	getIndividualCourse,
	getAnnouncements,
	togglePopup,
	popup,
	individualCourse,
	performance
}) => {
	const { course_id } = useParams();

	useEffect(() => {
		getIndividualCourse(course_id);
		getAnnouncements(course_id);
	}, [course_id]);

	return (
		individualCourse.course && (
			<div className="container-large individual-course">
				<div className="individual-course__banner">
					<div className="individual-course__banner__thumbnail"></div>
					<div className="individual-course__banner__name text-extra-large-SM">
						{individualCourse.course.name}
					</div>
					<div className="individual-course__banner__code text-large-M">
						{individualCourse.course.code}
					</div>
					<div className="individual-course__banner__access">
						<span className="access-code text-normal-sparsed-M">ac3t8</span>
						<span className="icon icon--light material-symbols-outlined">
							content_copy
						</span>
					</div>
				</div>
				<div className="individual-course__work">
					<div className="individual-course__work__category text-medium-M">
						<div>Assignments</div>
						<span className="material-symbols-outlined">arrow_drop_down_circle</span>
					</div>
					<div className="individual-course__work__chore-p-create">
						<button
							className="btn btn--capsule create"
							onClick={() => togglePopup(!popup.isVisible)}
						>
							<span className="material-symbols-outlined">add_circle</span>Create
						</button>
						<ul className="individual-course__work__list">
							{/* <ChoreAssignment
								performance={
									performance[
										performance.findIndex((perf) => {
											return perf.course._id === individualCourse.course._id;
										})
									]
								}
							/> */}
							<ChoreProject
								performance={
									performance[
										performance.findIndex((perf) => {
											return perf.course._id === individualCourse.course._id;
										})
									]
								}
							/>
						</ul>
					</div>
				</div>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse,
	performance: state.performance.performance.performance
});

export default connect(mapStateToProps, { getIndividualCourse, getAnnouncements, togglePopup })(
	IndividualCourse
);
