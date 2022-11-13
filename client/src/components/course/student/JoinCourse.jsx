import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import { enrollCourse } from '../../../reduxStore/actions/performance';
import { useForm } from '../../../hooks/useForm';

const JoinCourse = ({ enrollCourse, togglePopup }) => {
	const { formData, onChange } = useForm({ courseAccessCode: '' });
	const { courseAccessCode } = formData;

	return (
		<div className="popup">
			<div className="join-course container-medium">
				<div className="create-heading text-medium-SB">Join course</div>
				<form className="create__form text-normal-R">
					<label>Access Code</label>
					<input
						type="text"
						className="accessCode"
						name="courseAccessCode"
						value={courseAccessCode}
						onChange={onChange}
					/>
				</form>
				<div className="create__cta">
					<button className="btn btn--round" onClick={() => enrollCourse(formData)}>
						Enroll
					</button>
					<button className="btn btn--cancel" onClick={() => togglePopup(false)}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

export default connect(null, { enrollCourse, togglePopup })(JoinCourse);
