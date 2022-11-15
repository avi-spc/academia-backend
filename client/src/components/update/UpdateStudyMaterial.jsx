import { connect } from 'react-redux';

import { toggleUpdatePopup } from '../../reduxStore/actions/popus';
import { updateStudyMaterial } from '../../reduxStore/actions/course';
import { useForm } from '../../hooks/useForm';
import { isEmpty } from '../../utils/validator';

const UpdateStudyMaterial = ({ updateStudyMaterial, toggleUpdatePopup, noteDetails, courseId }) => {
	const { formData, onChange } = useForm({
		title: noteDetails.title
	});
	const { title } = formData;

	return (
		<div className="popup">
			<div className="create-chore container-medium text-normal-M">
				<div className="create-heading text-medium-SB">Update chore</div>
				<form className="create__form text-normal-R">
					<label>Title</label>
					<div className="input-group">
						<input
							type="text"
							maxLength="30"
							className="title"
							name="title"
							value={title}
							onChange={onChange}
						/>
						<span className="length-indicator">{title.length}/30</span>
					</div>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						disabled={isEmpty(formData)}
						onClick={(e) => {
							e.preventDefault();
							updateStudyMaterial({ title }, courseId, noteDetails._id);
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

export default connect(null, { updateStudyMaterial, toggleUpdatePopup })(UpdateStudyMaterial);
