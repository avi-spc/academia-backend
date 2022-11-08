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
							<Chore
								courseId={individualCourse.course._id}
								chore={assignment}
								type={type}
							/>
						</li>
					);
				})
			) : (
				<Chore
					courseId={individualCourse.course._id}
					chore={individualCourse.course.project}
					type={type}
				/>
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
