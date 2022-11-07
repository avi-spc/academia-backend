import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { getIndividualCourse, getAnnouncements } from '../../reduxStore/actions/course';

import AnnouncementDocket from './AnnouncementDocket';

const IndividualCourse = ({
	getIndividualCourse,
	getAnnouncements,
	togglePopup,
	popup,
	individualCourse
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
							<AnnouncementDocket />
						</ul>
					</div>
				</div>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps, { getIndividualCourse, getAnnouncements, togglePopup })(
	IndividualCourse
);
