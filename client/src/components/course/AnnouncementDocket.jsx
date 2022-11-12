import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import CreateAnnouncement from '../create/CreateAnnouncement';
import UpdateAnnouncement from '../update/UpdateAnnouncement';
import Announcement from './Announcement';

const AnnouncementDocket = ({ popup, individualCourse }) => {
	const [announcementDetails, setAnnouncementDetails] = useState(null);

	return (
		<Fragment>
			{individualCourse.announcements.map((announcement) => (
				<Announcement
					key={announcement._id}
					setAnnouncementDetails={setAnnouncementDetails}
					announcement={announcement}
				/>
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

export default connect(mapStateToProps)(AnnouncementDocket);
