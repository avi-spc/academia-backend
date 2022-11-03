const CourseCard = () => {
	return (
		<div className="course-card">
			<div className="course-card__details">
				<div className="course-card__details__thumbnail"></div>
				<div className="course-card__details__name"></div>
				<div className="course-card__details__code"></div>
				<div className="course-card__details__avatar"></div>
			</div>
			<div className="course-card__access">
				<div className="course-card__access__code"></div>
				<span className="course-card__access__copy-icon"></span>
			</div>
		</div>
	);
};

export default CourseCard;
