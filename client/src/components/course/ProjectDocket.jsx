import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import CreateChore from '../create/CreateChore';
import UpdateChore from '../update/UpdateChore';
import Chore from './Chore';

const ProjectDocket = ({ popup, individualCourse }) => {
	const [choreDetails, setChoreDetails] = useState(null);

	return (
		<Fragment>
			{individualCourse.course.project && (
				<Chore
					courseId={individualCourse.course._id}
					chore={individualCourse.course.project}
					type="project"
					setChoreDetails={setChoreDetails}
				/>
			)}
			{popup.isVisible && (
				<CreateChore courseId={individualCourse.course._id} type="project" />
			)}
			{popup.isUpdate && (
				<UpdateChore
					choreDetails={choreDetails}
					courseId={individualCourse.course._id}
					type="project"
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	popup: state.popup,
	individualCourse: state.course.individualCourse
});

export default connect(mapStateToProps)(ProjectDocket);
