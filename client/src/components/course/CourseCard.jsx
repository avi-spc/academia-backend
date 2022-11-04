const CourseCard = () => {
	return (
		<div className="course-card">
			<div className="course-card__details">
				<div className="course-card__details__thumbnail"></div>
				<div className="course-card__details__name text-large-SM">Calculus</div>
				<div className="course-card__details__code text-medium-M">CS201</div>
				<div className="course-card__details__avatar"></div>
			</div>
			<div className="course-card__access">
				<span className="course-card__access__code text-normal-sparsed-M">ac3t8</span>
				<span className="copy-icon material-symbols-outlined">content_copy</span>
			</div>
		</div>
	);
};

export default CourseCard;
