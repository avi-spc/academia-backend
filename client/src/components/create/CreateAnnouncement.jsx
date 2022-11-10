import { connect } from 'react-redux';

import { clearDocumentId, createAnnouncement } from '../../reduxStore/actions/course';
import { togglePopup } from '../../reduxStore/actions/popus';
import { useForm } from '../../hooks/useForm';

const CreateAnnouncement = ({ createAnnouncement, clearDocumentId, togglePopup, courseId }) => {
	const { formData, onChange } = useForm({ title: '', message: '' });
	const { title, message } = formData;

	return (
		<div className="popup">
			<div className="create-announcement container-medium text-normal-M">
				<div className="create-heading text-large-SM">New announcement</div>
				<form className="create__form">
					<label>Title</label>
					<input
						type="text"
						className="title"
						name="title"
						value={title}
						onChange={onChange}
					/>
					<label>Message</label>
					<textarea
						className="message"
						rows="5"
						name="message"
						value={message}
						onChange={onChange}
					/>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						onClick={() => {
							createAnnouncement(formData, courseId);
							togglePopup(false);
							clearDocumentId();
						}}
					>
						Create
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

export default connect(null, { createAnnouncement, togglePopup, clearDocumentId })(
	CreateAnnouncement
);
