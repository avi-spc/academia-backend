import { useRef } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import { createChore, uploadDocument, discardDocument } from '../../reduxStore/actions/course';
import { clearDocumentId } from '../../reduxStore/actions/course';
import { useForm } from '../../hooks/useForm';

const CreateChore = ({
	uploadDocument,
	discardDocument,
	createChore,
	togglePopup,
	clearDocumentId,
	documentId,
	courseId,
	type
}) => {
	const form = useRef();

	const { formData, onChange } = useForm({ title: '', deadline: '', maxMarks: '' });
	const { title, deadline, maxMarks } = formData;

	const cancelChore = () => {
		togglePopup(false);
		if (documentId) discardDocument(documentId);
	};

	return (
		<div className="popup">
			<div className="create-chore container-medium text-normal-M">
				<div className="create-heading text-medium-SB">New chore</div>
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
				<form className="create__form text-normal-R">
					<label>Title</label>
					<input
						type="text"
						className="title"
						name="title"
						value={title}
						onChange={onChange}
					/>
					<label>Deadline</label>
					<input
						type="date"
						className="deadline"
						name="deadline"
						value={deadline}
						onChange={onChange}
					/>
					<label>Points</label>
					<input
						type="number"
						className="points"
						name="maxMarks"
						value={maxMarks}
						onChange={onChange}
					/>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						onClick={(e) => {
							e.preventDefault();
							createChore({ title, deadline, maxMarks, documentId }, courseId, type);
							togglePopup(false);
							clearDocumentId();
						}}
					>
						Create
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
	createChore,
	uploadDocument,
	discardDocument,
	togglePopup,
	clearDocumentId
})(CreateChore);
