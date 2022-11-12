import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import CreateChore from '../create/CreateChore';
import UpdateChore from '../update/UpdateChore';
import UpdateDocument from '../update/UpdateDocument';
import Chore from './Chore';

const AssignmentDocket = ({ popup, individualCourse }) => {
	const [choreDetails, setChoreDetails] = useState(null);

	return (
		<Fragment>
			{individualCourse.course.assignments.map((assignment) => {
				return (
					<li key={assignment._id}>
						<Chore
							courseId={individualCourse.course._id}
							chore={assignment}
							type="assignment"
							setChoreDetails={setChoreDetails}
						/>
					</li>
				);
			})}
			{popup.isVisible && (
				<CreateChore courseId={individualCourse.course._id} type="assignment" />
			)}
			{popup.isUpdate && (
				<UpdateChore
					choreDetails={choreDetails}
					courseId={individualCourse.course._id}
					type="assignment"
				/>
			)}
			{popup.isDocUpdate && (
				<UpdateDocument
					chore={choreDetails}
					courseId={individualCourse.course._id}
					type="assignment"
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps)(AssignmentDocket);
