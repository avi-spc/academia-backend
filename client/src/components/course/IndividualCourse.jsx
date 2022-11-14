import { useState, Fragment, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
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
	const location = useLocation();

	const [showDropdown, setShowDropdown] = useState(false);
	const [activeTab, setActiveTab] = useState('announcements');
	const { course_id } = useParams();

	useEffect(() => {
		getIndividualCourse(course_id);
		getAnnouncements(course_id);
	}, [course_id]);

	useEffect(() => {
		if (location.pathname.split('/').length <= 5) {
			setActiveTab(selectTab(location.pathname.split('/')[3]));
		}
		setShowDropdown(false);
	}, [location]);

	const shareCourseCode = async (courseCode) => {
		await navigator.clipboard.writeText(courseCode);
	};

	const selectTab = (tab) => {
		if (!tab) {
			return 'announcements';
		}

		return tab;
	};

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
								<span
									className="icon icon--light material-symbols-outlined"
									onClick={() =>
										shareCourseCode(individualCourse.course.accessCode)
									}
								>
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
					<div
						className="individual-course__work__category text-extra-medium-SB"
						onClick={() => setShowDropdown(!showDropdown)}
					>
						<div className="category-tab">{activeTab}</div>
						{showDropdown && (
							<ul className="category-list">
								<Link to={`/courses/${course_id}`}>Announcements</Link>
								<Link
									to={
										account.type === 'instructor'
											? `/courses/${course_id}/assignments`
											: `/courses/${course_id}/assignments/performance`
									}
								>
									Assignments
								</Link>
								<Link
									to={
										account.type === 'instructor'
											? `/courses/${course_id}/project`
											: `/courses/${course_id}/project/performance`
									}
								>
									Project
								</Link>
								<Link to={`/courses/${course_id}/notes`}>Notes</Link>
							</ul>
						)}
						<span className="material-symbols-outlined">expand_circle_down</span>
					</div>
					<div className="individual-course__work__chore-p-create">
						{account.type === 'instructor' && location.pathname.split('/').length <= 4 && (
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
