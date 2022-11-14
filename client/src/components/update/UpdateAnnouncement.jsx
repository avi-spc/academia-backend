import { connect } from 'react-redux';

import { updateAnnouncement } from '../../reduxStore/actions/course';
import { toggleUpdatePopup } from '../../reduxStore/actions/popus';
import { useForm } from '../../hooks/useForm';

const UpdateAnnouncement = ({
	updateAnnouncement,
	toggleUpdatePopup,
	announcementDetails,
	courseId
}) => {
	const { formData, onChange } = useForm({
		title: announcementDetails.title,
		message: announcementDetails.message
	});
	const { title, message } = formData;

	return (
		<div className="popup">
			<div className="create-announcement container-medium text-normal-M">
				<div className="create-heading text-medium-SB">New announcement</div>
				<form className="create__form text-normal-R">
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
						onClick={(e) => {
							e.preventDefault();
							updateAnnouncement(formData, courseId, announcementDetails._id);
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

const mapStateToProps = (state) => ({
	popup: state.popup
});

export default connect(null, { updateAnnouncement, toggleUpdatePopup })(UpdateAnnouncement);
