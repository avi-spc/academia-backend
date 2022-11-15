import { connect } from 'react-redux';

import { updateAnnouncement } from '../../reduxStore/actions/course';
import { toggleUpdatePopup } from '../../reduxStore/actions/popus';
import { useForm } from '../../hooks/useForm';
import { isEmpty } from '../../utils/validator';

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
					<label>Message</label>
					<div className="input-group">
						<textarea
							className="message"
							maxLength="230"
							rows="5"
							name="message"
							value={message}
							onChange={onChange}
						/>
						<span className="length-indicator">{message.length}/230</span>
					</div>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						disabled={isEmpty(formData)}
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
