import { Fragment } from 'react';
import { connect } from 'react-redux';

import CreateChore from '../create/CreateChore';
import Chore from './Chore';

const ChoreDocket = ({ popup, individualCourse, type }) => {
	return (
		<Fragment>
			{type === 'assignment' ? (
				individualCourse.course.assignments.map((assignment) => {
					return (
						<li key={assignment._id}>
							<Chore chore={assignment} />
						</li>
					);
				})
			) : (
				<Chore chore={individualCourse.course.project} />
			)}
			{popup.isVisible && <CreateChore courseId={individualCourse.course._id} type={type} />}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps)(ChoreDocket);
