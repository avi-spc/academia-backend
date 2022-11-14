import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleUpdatePopup } from '../../reduxStore/actions/popus';

const CourseCard = ({ toggleUpdatePopup, popup, course, setCourseDetails, auth: { account } }) => {
	const shareCourseCode = async (courseCode) => {
		await navigator.clipboard.writeText(courseCode);
	};

	return (
		<div className="course-card">
			<Link to={`/courses/${course._id}`}>
				<div className="course-card__details">
					<div className="course-card__details__thumbnail"></div>
					<div className="course-card__details__name text-large-M">{course.name}</div>
					<div className="course-card__details__code text-medium-M">{course.code}</div>
					{/* <div className="course-card__details__avatar"></div> */}
				</div>
			</Link>
			<div className="course-card__access">
				<span className="course-card__access__code text-normal-sparsed-M">
					{course.accessCode}
				</span>
				<span
					className="icon icon--dark material-symbols-outlined"
					onClick={() => shareCourseCode(course.accessCode)}
				>
					content_copy
				</span>
				{account.type === 'instructor' && (
					<button
						className="btn btn--capsule-sm update"
						onClick={() => {
							setCourseDetails(course);
							toggleUpdatePopup(!popup.isUpdate);
						}}
					>
						Update
					</button>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	auth: state.auth
});

export default connect(mapStateToProps, { toggleUpdatePopup })(CourseCard);
