import { useRef } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import {
	uploadDocument,
	discardDocument,
	clearDocumentId
} from '../../../reduxStore/actions/course';
import { submitAssignment } from '../../../reduxStore/actions/performance';
import { isEmpty } from '../../../utils/validator';

const SubmitAssignment = ({
	submitAssignment,
	uploadDocument,
	discardDocument,
	togglePopup,
	clearDocumentId,
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
			<div className="create-chore container-medium">
				<div className="create-heading text-medium-SB">Submit assignment</div>
				<form className="create__file text-normal-R" ref={form}>
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
						disabled={isEmpty({ documentId })}
						onClick={() => {
							submitAssignment({ documentId }, courseId, assignmentId);
							togglePopup(false);
							clearDocumentId();
						}}
					>
						Submit
					</button>
					<button className="btn btn--cancel" onClick={cancelChore}>
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
	togglePopup,
	clearDocumentId
})(SubmitAssignment);
