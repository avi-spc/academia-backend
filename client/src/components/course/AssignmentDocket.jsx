import { Fragment } from 'react';
import { connect } from 'react-redux';

import CreateChore from '../create/CreateChore';
import Chore from './Chore';

const AssignmentDocket = ({ popup, individualCourse }) => {
	return (
		<Fragment>
			{individualCourse.course.assignments.map((assignment) => {
				return (
					<li key={assignment._id}>
						<Chore
							courseId={individualCourse.course._id}
							chore={assignment}
							type="assignment"
						/>
					</li>
				);
			})}
			{popup.isVisible && (
				<CreateChore courseId={individualCourse.course._id} type="assignment" />
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps)(AssignmentDocket);
