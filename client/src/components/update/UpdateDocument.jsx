import { useRef } from 'react';
import { connect } from 'react-redux';

import { toggleUpdateDocPopup } from '../../reduxStore/actions/popus';
import {
	uploadDocument,
	discardDocument,
	clearDocumentId,
	updateChoreDoc
} from '../../reduxStore/actions/course';

const UpdateDocument = ({
	updateChoreDoc,
	uploadDocument,
	discardDocument,
	toggleUpdateDocPopup,
	clearDocumentId,
	documentId,
	courseId,
	chore,
	type
}) => {
	const form = useRef();

	const cancelChore = () => {
		toggleUpdateDocPopup(false);
		if (documentId) discardDocument(documentId);
	};

	return (
		<div className="popup">
			<div className="create-chore container-medium">
				<div className="create-heading text-medium-SB">Update doc</div>
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
						disabled={documentId ? false : true}
						onClick={(e) => {
							e.preventDefault();
							updateChoreDoc(
								{ documentId },
								courseId,
								chore._id,
								chore.documentId,
								type
							);
							toggleUpdateDocPopup(false);
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
	uploadDocument,
	discardDocument,
	toggleUpdateDocPopup,
	updateChoreDoc,
	clearDocumentId
})(UpdateDocument);
