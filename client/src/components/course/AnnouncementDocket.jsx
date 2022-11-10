import { Fragment } from 'react';
import { connect } from 'react-redux';

import CreateAnnouncement from '../create/CreateAnnouncement';

const AnnouncementDocket = ({ popup, individualCourse }) => {
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
					</div>
				</li>
			))}
			{popup.isVisible && <CreateAnnouncement courseId={individualCourse.course._id} />}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps)(AnnouncementDocket);
