import { useEffect } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { getAllCourses } from '../../reduxStore/actions/course';

import Course from '../create/Course';
import CourseCard from './CourseCard';

const CourseDocket = ({ togglePopup, getAllCourses, popup, courses }) => {
	useEffect(() => {
		getAllCourses();
	}, []);

	return (
		<div className="course-docket container-large">
			<h1 className="course-docket__heading">Courses</h1>
			<div className="course-docket__courses-list">
				{courses.map((course) => {
					return <CourseCard course={course} key={course._id} />;
				})}
			</div>
			<button className="btn btn--round" onClick={() => togglePopup(!popup.isVisible)}>
				Create
			</button>
			{popup.isVisible && <Course />}
		</div>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	courses: state.course.courses
});

export default connect(mapStateToProps, { togglePopup, getAllCourses })(CourseDocket);
