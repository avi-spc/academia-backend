import CourseCard from './CourseCard';

const CourseDocket = () => {
	return (
		<div className="course-docket container-large">
			<h1 className="course-docket__heading">Courses</h1>
			<div className="course-docket__courses-list">
				<CourseCard />
				<CourseCard />
				<CourseCard />
				<CourseCard />
			</div>
		</div>
	);
};

export default CourseDocket;
