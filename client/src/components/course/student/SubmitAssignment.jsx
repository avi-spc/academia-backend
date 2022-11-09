import { useRef } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import { uploadDocument, discardDocument } from '../../../reduxStore/actions/course';
import { submitAssignment } from '../../../reduxStore/actions/performance';

const SubmitAssignment = ({
	submitAssignment,
	uploadDocument,
	discardDocument,
	togglePopup,
	documentId,
	courseId,
	assignmentId
}) => {
	const form = useRef();

	const cancelChore = () => {
		togglePopup(false);
		if (documentId) discardDocument(documentId);
	};

	return (
		<div className="popup">
			<div className="create-chore container-medium text-normal-M">
				<div className="create-heading text-large-SM">Submit assignment</div>
				<form ref={form}>
					<label className="doc-label" htmlFor="doc-file">
						<span>Upload file</span>
					</label>
					<input
						type="file"
						className="doc-file"
						id="doc-file"
						name="file"
						onChange={() => uploadDocument(form.current)}
					/>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						onClick={() => submitAssignment({ documentId }, courseId, assignmentId)}
					>
						Submit
					</button>
					<button className="btn btn--round" onClick={cancelChore}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	documentId: state.course.documentId
});

export default connect(mapStateToProps, {
	submitAssignment,
	uploadDocument,
	discardDocument,
	togglePopup
})(SubmitAssignment);
