import { useState } from 'react';
import { connect } from 'react-redux';

import { toggleUpdatePopup } from '../../reduxStore/actions/popus';

const Announcement = ({
	popup,
	toggleUpdatePopup,
	announcement,
	setAnnouncementDetails,
	auth: { account }
}) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<li className="chore-parent">
			<div className="announcement">
				<span className="icon icon--dark material-symbols-outlined">campaign</span>
				<div className="announcement__title text-medium-SB">{announcement.title}</div>
				<div className="announcement__timestamp text-small-R">Posted 12:04 PM</div>
				{account.type === 'instructor' && (
					<div className="more-p-dropdown">
						<span
							className="icon--more material-symbols-outlined"
							onClick={() => setShowDropdown(!showDropdown)}
						>
							expand_circle_down
						</span>
						{showDropdown && (
							<div className="more-dropdown">
								<button
									className="btn btn--round"
									onClick={() => {
										setAnnouncementDetails(announcement);
										toggleUpdatePopup(!popup.isUpdate);
										setShowDropdown(false);
									}}
								>
									Update
								</button>
							</div>
						)}
					</div>
				)}
				<p className="announcement__message text-medium-R">{announcement.message}</p>
			</div>
		</li>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	auth: state.auth
});

export default connect(mapStateToProps, { toggleUpdatePopup })(Announcement);
