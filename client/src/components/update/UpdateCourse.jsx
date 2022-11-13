import { connect } from 'react-redux';

import { updateCourse } from '../../reduxStore/actions/course';
import { toggleUpdatePopup } from '../../reduxStore/actions/popus';
import { useForm } from '../../hooks/useForm';

const CreateCourse = ({ updateCourse, toggleUpdatePopup, courseDetails }) => {
	const { formData, onChange } = useForm({
		code: courseDetails.code,
		credits: courseDetails.credits,
		name: courseDetails.name
	});
	const { code, credits, name } = formData;

	return (
		<div className="popup">
			<div className="create-course container-medium">
				<div className="create-heading text-medium-SB">Update course</div>
				<form className="create__form text-normal-R">
					<label>Code</label>
					<input
						type="text"
						className="code"
						name="code"
						value={code}
						onChange={onChange}
					/>
					<label>Credits</label>
					<input
						type="number"
						className="credits"
						name="credits"
						value={credits}
						onChange={onChange}
					/>
					<label>Name</label>
					<input
						type="text"
						className="name"
						name="name"
						value={name}
						onChange={onChange}
					/>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						onClick={() => {
							updateCourse(formData, courseDetails._id);
							toggleUpdatePopup(false);
						}}
					>
						Update
					</button>
					<button className="btn btn--cancel" onClick={() => toggleUpdatePopup(false)}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

export default connect(null, { updateCourse, toggleUpdatePopup })(CreateCourse);
