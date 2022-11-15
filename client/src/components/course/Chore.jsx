import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleUpdatePopup, toggleUpdateDocPopup } from '../../reduxStore/actions/popus';
import { useState } from 'react';
import { timeInWords } from '../../utils/timestampFormatter';

const Chore = ({
	toggleUpdatePopup,
	toggleUpdateDocPopup,
	setChoreDetails,
	courseId,
	chore,
	type,
	popup
}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const location = useLocation();

	return (
		<div className="chore-parent">
			<div className="chore text-medium-R">
				<div className="chore__header">
					<span className="icon icon--light material-symbols-outlined">assignment</span>
					<div className="chore__header__title text-medium-SB">{chore.title}</div>
					<div className="chore__header__timestamp text-small-R">
						{timeInWords(chore.createdAt)}
					</div>
					{location.pathname.split('/').length <= 4 && (
						<div className="more-p-dropdown">
							<span
								className="icon--more material-symbols-outlined"
								onClick={() => setShowDropdown(!showDropdown)}
							>
								expand_circle_down
							</span>
							{showDropdown && (
								<div className="more-dropdown">
									<Link
										to={`/courses/${courseId}/chore/${chore._id}/${type}`}
										className="btn btn--round center"
									>
										Submissions
									</Link>
									<button
										className="btn btn--round"
										onClick={() => {
											setChoreDetails(chore);
											toggleUpdatePopup(!popup.isUpdate);
											setShowDropdown(false);
										}}
									>
										Update details
									</button>
									<button
										className="btn btn--round"
										onClick={() => {
											setChoreDetails(chore);
											toggleUpdateDocPopup(!popup.isDocUpdate);
											setShowDropdown(false);
										}}
									>
										Update Doc
									</button>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="chore__details">
					<div>
						<label>Deadline</label>
						<div className="chore__details__deadline text-large-M">
							{timeInWords(chore.deadline)}
						</div>
					</div>
					<div>
						<label>Points</label>
						<div className="chore__details__points text-large-M">{chore.maxMarks}</div>
					</div>
					<a
						className="btn btn--round"
						href={`http://localhost:5000/api/performance/submissions/file/${chore.documentId}`}
						target="_blank"
					>
						View details
					</a>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup
});

export default connect(mapStateToProps, { toggleUpdatePopup, toggleUpdateDocPopup })(Chore);
