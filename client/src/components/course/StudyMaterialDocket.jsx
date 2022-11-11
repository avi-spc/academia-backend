import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { toggleUpdatePopup } from '../../reduxStore/actions/popus';

import CreateStudyMaterial from '../create/CreateStudyMaterial';
import UpdateStudyMaterial from '../update/UpdateStudyMaterial';

const StudyMaterialDocket = ({ popup, individualCourse, toggleUpdatePopup }) => {
	const [noteDetails, setNoteDetails] = useState(null);

	return (
		<Fragment>
			{individualCourse.course.studyMaterial.notes.map((note) => (
				<li key={note._id}>
					<div className="study-material">
						<div className="study-material__header">
							<span className="icon icon--light material-symbols-outlined">
								description
							</span>
							<div className="study-material__header__title text-medium-SB">
								{note.title}
							</div>
							<div className="study-material__header__timestamp text-small-R">
								Posted 12:04 PM
							</div>
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
							<button
								className="btn btn--round"
								onClick={() => {
									setNoteDetails(note);
									toggleUpdatePopup(!popup.isUpdate);
								}}
							>
								Update details
							</button>
						</div>
					</div>
				</li>
			))}
			{popup.isVisible && <CreateStudyMaterial courseId={individualCourse.course._id} />}
			{popup.isUpdate && (
				<UpdateStudyMaterial
					noteDetails={noteDetails}
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

export default connect(mapStateToProps, { toggleUpdatePopup })(StudyMaterialDocket);
