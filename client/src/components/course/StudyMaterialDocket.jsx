import { Fragment } from 'react';
import { connect } from 'react-redux';

import CreateStudyMaterial from '../create/CreateStudyMaterial';

const StudyMaterialDocket = ({ popup, individualCourse }) => {
	return (
		<Fragment>
			{individualCourse.course.studyMaterial.notes.map((note) => (
				<li key={note._id}>
					<div className="study-material text-normal-M">
						<div className="study-material__header">
							<span className="icon icon--light material-symbols-outlined">
								description
							</span>
							<div className="study-material__header__title">{note.title}</div>
							<div className="study-material__header__timestamp text-small-M">
								Posted 12:04 PM
							</div>
						</div>
						<div className="study-material__details">
							<button className="btn btn--round">Download</button>
						</div>
					</div>
				</li>
			))}
			{popup.isVisible && <CreateStudyMaterial courseId={individualCourse.course._id} />}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps)(StudyMaterialDocket);