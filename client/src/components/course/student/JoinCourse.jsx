import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import { enrollCourse } from '../../../reduxStore/actions/performance';
import { useForm } from '../../../hooks/useForm';

const JoinCourse = ({ enrollCourse, togglePopup }) => {
	const { formData, onChange } = useForm({ courseAccessCode: '' });
	const { courseAccessCode } = formData;

	return (
		<div className="popup">
			<div className="create-course container-medium text-normal-M">
				<div className="create-heading text-large-SM">Join course</div>
				<form className="create__form">
					<label>Course Access Code</label>
					<input
						type="text"
						className="code"
						name="courseAccessCode"
						value={courseAccessCode}
						onChange={onChange}
					/>
				</form>
				<div className="create__cta">
					<button className="btn btn--round" onClick={() => enrollCourse(formData)}>
						Enroll
					</button>
					<button className="btn btn--round" onClick={() => togglePopup(false)}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

export default connect(null, { enrollCourse, togglePopup })(JoinCourse);
