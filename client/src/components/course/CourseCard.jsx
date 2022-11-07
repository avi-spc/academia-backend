import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
	return (
		<Link to={`/instructor/courses/${course._id}`} className="course-card">
			<div className="course-card__details">
				<div className="course-card__details__thumbnail"></div>
				<div className="course-card__details__name text-large-SM">{course.name}</div>
				<div className="course-card__details__code text-medium-M">{course.code}</div>
				<div className="course-card__details__avatar"></div>
			</div>
			<div className="course-card__access">
				<span className="course-card__access__code text-normal-sparsed-M">ac3t8</span>
				<span className="icon icon--dark material-symbols-outlined">content_copy</span>
			</div>
		</Link>
	);
};

export default CourseCard;
