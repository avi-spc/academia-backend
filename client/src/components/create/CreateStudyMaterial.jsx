import { useRef } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../reduxStore/actions/popus';
import {
	createStudyMaterial,
	uploadDocument,
	discardDocument,
	clearDocumentId
} from '../../reduxStore/actions/course';
import { useForm } from '../../hooks/useForm';

const CreateStudyMaterial = ({
	createStudyMaterial,
	uploadDocument,
	discardDocument,
	togglePopup,
	clearDocumentId,
	documentId,
	courseId
}) => {
	const form = useRef();

	const { formData, onChange } = useForm({ title: '' });
	const { title } = formData;

	const cancelChore = () => {
		togglePopup(false);
		if (documentId) discardDocument(documentId);
	};

	return (
		<div className="popup">
			<div className="create-chore container-medium text-normal-M">
				<div className="create-heading text-large-SM">New study material</div>
				<form className="create__file" ref={form}>
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
				<form className="create__form">
					<label>Title</label>
					<input
						type="text"
						className="title"
						name="title"
						value={title}
						onChange={onChange}
					/>
				</form>
				<div className="create__cta">
					<button
						className="btn btn--round"
						onClick={() => {
							createStudyMaterial({ title, documentId }, courseId);
							togglePopup(false);
							clearDocumentId();
						}}
					>
						Create
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
	createStudyMaterial,
	uploadDocument,
	discardDocument,
	togglePopup,
	clearDocumentId
})(CreateStudyMaterial);
