import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { createCourse } from '../../reduxStore/actions/course';
import { useForm } from '../../hooks/useForm';

const CreateCourse = ({ createCourse, togglePopup }) => {
	const { formData, onChange } = useForm({ code: '', credits: '', name: '' });
	const { code, credits, name } = formData;

	return (
		<div className="popup">
			<div className="create-course container-medium">
				<div className="create-heading text-medium-SB">New course</div>
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
							createCourse(formData);
							togglePopup(false);
						}}
					>
						Create
					</button>
					<button className="btn btn--cancel" onClick={() => togglePopup(false)}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { createCourse, togglePopup })(CreateCourse);
