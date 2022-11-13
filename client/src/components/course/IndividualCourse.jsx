import { useState, Fragment, useEffect } from 'react';
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
					<div className="individual-course__banner__name text-extra-large-M">
						{individualCourse.course.name}
					</div>
					<div className="individual-course__banner__code text-extra-medium-SB">
						{individualCourse.course.code}
					</div>
					<div className="individual-course__banner__access">
						{account.type === 'instructor' ? (
							<Fragment>
								<span className="access-code text-normal-sparsed-M">
									{individualCourse.course.accessCode}
								</span>
								<span className="icon icon--light material-symbols-outlined">
									content_copy
								</span>
							</Fragment>
						) : (
							<span className="instructor-name text-medium-M">
								{individualCourse.course.instructor.name}
							</span>
						)}
					</div>
				</div>
				<div className="individual-course__work">
					<div className="individual-course__work__category text-extra-medium-SB">
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
						<span className="material-symbols-outlined">expand_circle_down</span>
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
