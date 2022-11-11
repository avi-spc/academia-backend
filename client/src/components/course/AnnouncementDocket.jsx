import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { toggleUpdatePopup } from '../../reduxStore/actions/popus';
import CreateAnnouncement from '../create/CreateAnnouncement';
import UpdateAnnouncement from '../update/UpdateAnnouncement';

const AnnouncementDocket = ({ popup, individualCourse, toggleUpdatePopup }) => {
	const [announcementDetails, setAnnouncementDetails] = useState(null);

	return (
		<Fragment>
			{individualCourse.announcements.map((announcement) => (
				<li key={announcement._id}>
					<div className="announcement">
						<span className="icon icon--dark material-symbols-outlined">campaign</span>
						<div className="announcement__title text-medium-SB">
							{announcement.title}
						</div>
						<div className="announcement__timestamp text-small-R">Posted 12:04 PM</div>
						<p className="announcement__message text-medium-R">
							{announcement.message}
						</p>
						<button
							className="btn btn--round"
							onClick={() => {
								setAnnouncementDetails(announcement);
								toggleUpdatePopup(!popup.isUpdate);
							}}
						>
							Update
						</button>
					</div>
				</li>
			))}
			{popup.isVisible && <CreateAnnouncement courseId={individualCourse.course._id} />}
			{popup.isUpdate && (
				<UpdateAnnouncement
					announcementDetails={announcementDetails}
					courseId={individualCourse.course._id}
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps, { toggleUpdatePopup })(AnnouncementDocket);
