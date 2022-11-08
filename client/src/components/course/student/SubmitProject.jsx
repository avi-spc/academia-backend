import { useRef } from 'react';
import { connect } from 'react-redux';

import { togglePopup } from '../../../reduxStore/actions/popus';
import { uploadDocument, discardDocument } from '../../../reduxStore/actions/course';
import { submitProject } from '../../../reduxStore/actions/performance';
import { useForm } from '../../../hooks/useForm';

const SubmitProject = ({
	submitProject,
	uploadDocument,
	discardDocument,
	togglePopup,
	documentId,
	courseId,
	projectId
}) => {
	const form = useRef();

	const { formData, onChange } = useForm({ title: '', synopsis: '' });
	const { title, synopsis } = formData;

	const cancelChore = () => {
		togglePopup(false);
		discardDocument(documentId);
	};

	return (
		<div className="create-chore container-medium text-normal-M">
			<div className="create-heading text-large-SM">Submit project</div>
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
			<form className="create__form">
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
					type="text"
					className="deadline"
					name="synopsis"
					value={synopsis}
					onChange={onChange}
				/>
			</form>
			<div className="create__cta">
				<button
					className="btn btn--round"
					onClick={() =>
						submitProject({ title, documentId, synopsis }, courseId, projectId)
					}
				>
					Submit
				</button>
				<button className="btn btn--round" onClick={cancelChore}>
					Cancel
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	documentId: state.course.documentId
});

export default connect(mapStateToProps, {
	submitProject,
	uploadDocument,
	discardDocument,
	togglePopup
})(SubmitProject);
