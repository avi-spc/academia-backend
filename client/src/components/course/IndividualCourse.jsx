import { useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { getIndividualCourse, getAnnouncements } from '../../reduxStore/actions/course';

const IndividualCourse = ({
	getIndividualCourse,
	getAnnouncements,
	togglePopup,
	popup,
	individualCourse,
	auth: { account }
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
						<ul>
							<li>
								<Link to={`/courses/${course_id}`}>Announcements</Link>
							</li>
							<li>
								<Link
									to={
										account.type === 'instructor'
											? `/courses/${course_id}/assignments`
											: `/courses/${course_id}/assignments/performance`
									}
								>
									Assignments
								</Link>
							</li>
							<li>
								<Link
									to={
										account.type === 'instructor'
											? `/courses/${course_id}/project`
											: `/courses/${course_id}/project/performance`
									}
								>
									Project
								</Link>
							</li>
							<li>
								<Link to={`/courses/${course_id}/notes`}>Notes</Link>
							</li>
						</ul>
						<span className="material-symbols-outlined">arrow_drop_down_circle</span>
					</div>
					<div className="individual-course__work__chore-p-create">
						{account.type === 'instructor' && (
							<button
								className="btn btn--capsule create"
								onClick={() => togglePopup(!popup.isVisible)}
							>
								<span className="material-symbols-outlined">add_circle</span>Create
							</button>
						)}
						<ul className="individual-course__work__list">
							<Outlet context={{ individualCourse }} />
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
	auth: state.auth
});

export default connect(mapStateToProps, { getIndividualCourse, getAnnouncements, togglePopup })(
	IndividualCourse
);
