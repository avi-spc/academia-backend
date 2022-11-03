const IndividualCourse = () => {
	return (
		<div className="individual-course">
			<div className="individual-course__banner">
				<div className="individual-course__banner__thumbnail"></div>
				<div className="individual-course__banner__name"></div>
				<div className="individual-course__banner__code"></div>
				<div className="individual-course__banner__access-code"></div>
				<span className="individual-course__banner__copy-icon"></span>
			</div>
			<div className="individual-course__work">
				<div className="individual-course__work__category"></div>
				<button className="create">Create</button>
				<ul className="individual-course__work__list"></ul>
			</div>
		</div>
	);
};

export default IndividualCourse;
