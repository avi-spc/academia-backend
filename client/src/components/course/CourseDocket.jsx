import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { getAllCourses } from '../../reduxStore/actions/course';
import { getPerformance } from '../../reduxStore/actions/performance';

import CreateCourse from '../create/CreateCourse';
import CourseCard from './CourseCard';
import JoinCourse from './student/JoinCourse';
import UpdateCourse from '../update/UpdateCourse';

const CourseDocket = ({ togglePopup, getPerformance, popup, auth: { account } }) => {
	const [courseDetails, setCourseDetails] = useState(null);

	useEffect(() => {
		if (account && account.type === 'student') {
			getPerformance();
		}
	}, [account]);

	return (
		account && (
			<div className="course-docket container-large">
				<h1 className="course-docket__heading text-extra-large-SB">Courses</h1>
				<div className="course-docket__courses-list">
					{account.type === 'student'
						? account.coursesEnrolled.map((course) => {
								return (
									<CourseCard course={course.course} key={course.course._id} />
								);
						  })
						: account.coursesIncharge.map((course) => {
								return (
									<CourseCard
										course={course.course}
										key={course.course._id}
										setCourseDetails={setCourseDetails}
									/>
								);
						  })}
					<div className="join-or-create" onClick={() => togglePopup(!popup.isVisible)}>
						<span className="icon icon--dark material-symbols-outlined">add</span>
						<span className="text-extra-medium-SB">
							{account.type === 'student' ? 'Enroll' : 'Create'}
						</span>
					</div>
				</div>
				{popup.isVisible &&
					(account.type === 'student' ? <JoinCourse /> : <CreateCourse />)}
				{popup.isUpdate && <UpdateCourse courseDetails={courseDetails} />}
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
