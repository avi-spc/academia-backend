import { connect } from 'react-redux';

import { gradeAssignment, gradeProject } from '../../reduxStore/actions/performance';
import { togglePopup } from '../../reduxStore/actions/popus';
import { useForm } from '../../hooks/useForm';

const GradeChore = ({
	gradeAssignment,
	gradeProject,
	togglePopup,
	type,
	studentId,
	courseId,
	choreId
}) => {
	const { formData, onChange } = useForm({ marks: '' });
	const { marks } = formData;

	return (
		<div className="popup">
			<div className="create-announcement container-medium text-normal-M">
				<div className="create-heading text-large-SM">Grade {type}</div>
				<form className="create__form">
					<label>Marks</label>
					<input
						type="text"
						className="title"
						name="marks"
						value={marks}
						onChange={onChange}
					/>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						onClick={() => {
							if (type === 'assignment') {
								gradeAssignment(formData, studentId, courseId, choreId);
							} else {
								gradeProject(formData, studentId, courseId);
							}
							togglePopup(false);
						}}
					>
						Grade
					</button>
					<button className="btn btn--round" onClick={() => togglePopup(false)}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup
});

export default connect(null, { gradeAssignment, gradeProject, togglePopup })(GradeChore);
