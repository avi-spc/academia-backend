import { useEffect } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { getAllCourses } from '../../reduxStore/actions/course';
import { getPerformance } from '../../reduxStore/actions/performance';

import CreateCourse from '../create/CreateCourse';
import CourseCard from './CourseCard';
import JoinCourse from './student/JoinCourse';

const CourseDocket = ({ togglePopup, getPerformance, popup, courses, auth: { account } }) => {
	useEffect(() => {
		if (account.type === 'student') {
			getPerformance();
		}
	}, []);

	return (
		account && (
			<div className="course-docket container-large">
				<h1 className="course-docket__heading">Courses</h1>
				<div className="course-docket__courses-list">
					{account.type === 'student'
						? account.coursesEnrolled.map((course) => {
								return (
									<CourseCard course={course.course} key={course.course._id} />
								);
						  })
						: account.coursesIncharge.map((course) => {
								return (
									<CourseCard course={course.course} key={course.course._id} />
								);
						  })}
					<div className="join-or-create" onClick={() => togglePopup(!popup.isVisible)}>
						<span className="icon icon--dark material-symbols-outlined">add</span>
						<span className="text-large-SM">
							{account.type === 'student' ? 'Enroll' : 'Create'}
						</span>
					</div>
				</div>
				{popup.isVisible &&
					(account.type === 'student' ? <JoinCourse /> : <CreateCourse />)}
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	courses: state.course.courses,
	auth: state.auth
});

export default connect(mapStateToProps, { togglePopup, getPerformance })(CourseDocket);
