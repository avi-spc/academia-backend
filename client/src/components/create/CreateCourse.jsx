import { connect } from 'react-redux';

import { createCourse } from '../../reduxStore/actions/course';
import { useForm } from '../../hooks/useForm';

const CreateCourse = ({ createCourse }) => {
	const { formData, onChange } = useForm({ code: '', credits: '', name: '' });
	const { code, credits, name } = formData;

	return (
		<div className="create-course container-medium text-normal-M">
			<div className="create-heading text-large-SM">New course</div>
			<form className="create__form">
				<label>Code</label>
				<input type="text" className="code" name="code" value={code} onChange={onChange} />
				<label>Credits</label>
				<input
					type="text"
					className="credits"
					name="credits"
					value={credits}
					onChange={onChange}
				/>
				<label>Name</label>
				<input type="text" className="name" name="name" value={name} onChange={onChange} />
			</form>
			<div className="create__cta">
				<button className="btn btn--round" onClick={() => createCourse(formData)}>
					Create
				</button>
				<button className="btn btn--round">Cancel</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

export default connect(null, { createCourse })(CreateCourse);
