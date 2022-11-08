import { Fragment } from 'react';
import { connect } from 'react-redux';

import CreateChore from '../create/CreateChore';
import Chore from './Chore';

const ProjectDocket = ({ popup, individualCourse, type }) => {
	return (
		<Fragment>
			<Chore
				courseId={individualCourse.course._id}
				chore={individualCourse.course.project}
				type="project"
			/>

			{popup.isVisible && (
				<CreateChore courseId={individualCourse.course._id} type="project" />
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps)(ProjectDocket);
