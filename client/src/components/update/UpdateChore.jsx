import { connect } from 'react-redux';

import { toggleUpdatePopup } from '../../reduxStore/actions/popus';
import { updateChore } from '../../reduxStore/actions/course';
import { useForm } from '../../hooks/useForm';
import { isEmpty } from '../../utils/validator';

const CreateChore = ({ updateChore, toggleUpdatePopup, choreDetails, courseId, type }) => {
	const { formData, onChange } = useForm({
		title: choreDetails.title,
		deadline: choreDetails.deadline,
		maxMarks: choreDetails.maxMarks
	});
	const { title, deadline, maxMarks } = formData;

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
					<label>Deadline</label>
					<input
						type="text"
						className="deadline"
						name="deadline"
						value={deadline}
						onChange={onChange}
					/>
					<label>Points</label>
					<input
						type="number"
						className="points"
						name="maxMarks"
						value={maxMarks}
						onChange={onChange}
					/>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						disabled={isEmpty(formData)}
						onClick={(e) => {
							e.preventDefault();
							updateChore(
								{ title, deadline, maxMarks },
								courseId,
								choreDetails._id,
								type
							);
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

export default connect(null, { updateChore, toggleUpdatePopup })(CreateChore);
