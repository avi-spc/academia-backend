import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { createCourse } from '../../reduxStore/actions/course';
import { useForm } from '../../hooks/useForm';
import { isEmpty } from '../../utils/validator';

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
					<div className="input-group">
						<input
							type="text"
							maxLength="50"
							className="name"
							name="name"
							value={name}
							onChange={onChange}
						/>
						<span className="length-indicator">{name.length}/50</span>
					</div>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						disabled={isEmpty(formData)}
						onClick={(e) => {
							e.preventDefault();
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
