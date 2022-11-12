import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { toggleUpdatePopup, toggleUpdateDocPopup } from '../../reduxStore/actions/popus';

const StudyMaterialDocket = ({
	popup,
	toggleUpdatePopup,
	toggleUpdateDocPopup,
	setNoteDetails,
	note,
	auth: { account }
}) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<li className="chore-parent">
			<div className="study-material">
				<div className="study-material__header">
					<span className="icon icon--light material-symbols-outlined">description</span>
					<div className="study-material__header__title text-medium-SB">{note.title}</div>
					<div className="study-material__header__timestamp text-small-R">
						Posted 12:04 PM
					</div>
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
											setNoteDetails(note);
											toggleUpdatePopup(!popup.isUpdate);
										}}
									>
										Update details
									</button>
									<button
										className="btn btn--round"
										onClick={() => {
											setNoteDetails(note);
											toggleUpdateDocPopup(!popup.isDocUpdate);
										}}
									>
										Update Doc
									</button>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="study-material__details">
					<button className="btn btn--round">
						<a
							href={`http://localhost:5000/api/performance/submissions/file/${note.documentId}`}
							target="_blank"
						>
							Download
						</a>
					</button>
				</div>
			</div>
		</li>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	auth: state.auth
});

export default connect(mapStateToProps, { toggleUpdatePopup, toggleUpdateDocPopup })(
	StudyMaterialDocket
);
