import { Link } from 'react-router-dom';

const Chore = ({ courseId, chore, type }) => {
	return (
		<Link to={`/courses/${courseId}/chore/${chore._id}/${type}`}>
			<div className="chore text-normal-M">
				<div className="chore__header">
					<span className="icon icon--light material-symbols-outlined">assignment</span>
					<div className="chore__header__title">{chore.title}</div>
					<div className="chore__header__timestamp text-small-M">Posted 12:04 PM</div>
				</div>
				<div className="chore__details">
					<div>
						<label>Deadline</label>
						<div className="chore__details__deadline text-large-M">
							{chore.deadline}
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
				</div>
			</div>
		</Link>
	);
};

export default Chore;
