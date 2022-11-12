import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleUpdatePopup, toggleUpdateDocPopup } from '../../reduxStore/actions/popus';

const Chore = ({
	toggleUpdatePopup,
	toggleUpdateDocPopup,
	setChoreDetails,
	courseId,
	chore,
	type,
	popup
}) => {
	return (
		// <Link to={`/courses/${courseId}/chore/${chore._id}/${type}`}>
		<div className="chore text-medium-R">
			<div className="chore__header">
				<span className="icon icon--light material-symbols-outlined">assignment</span>
				<div className="chore__header__title text-medium-SB">{chore.title}</div>
				<div className="chore__header__timestamp text-small-R">Posted 12:04 PM</div>
			</div>
			<div className="chore__details">
				<div>
					<label>Deadline</label>
					<div className="chore__details__deadline text-large-M">
						{chore.deadline.substring(0, 10)}
					</div>
				</div>
				<div>
					<label>Points</label>
					<div className="chore__details__points text-large-M">{chore.maxMarks}</div>
				</div>
				<button className="btn btn--round">
					<a
						href={`http://localhost:5000/api/performance/submissions/file/${chore.documentId}`}
						target="_blank"
					>
						View details
					</a>
				</button>
				<button
					className="btn btn--round"
					onClick={() => {
						setChoreDetails(chore);
						toggleUpdatePopup(!popup.isUpdate);
					}}
				>
					Update details
				</button>
				<button
					className="btn btn--round"
					onClick={() => {
						setChoreDetails(chore);
						toggleUpdateDocPopup(!popup.isDocUpdate);
					}}
				>
					Update Doc
				</button>
			</div>
		</div>
		// </Link>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup
});

export default connect(mapStateToProps, { toggleUpdatePopup, toggleUpdateDocPopup })(Chore);
