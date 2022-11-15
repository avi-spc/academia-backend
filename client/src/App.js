import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reduxStore/store';
import { getAccount } from './reduxStore/actions/auth';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/PrivateRoute';
import CourseDocket from './components/course/CourseDocket';
import IndividualCourse from './components/course/IndividualCourse';
import ChoreSubmissions from './components/course/ChoreSubmissions';
import IndividualSubmissionAssignment from './components/course/IndividualSubmissionAssignment';
import IndividualSubmissionProject from './components/course/IndividualSubmissionProject';
import AnnouncementDocket from './components/course/AnnouncementDocket';
import AssignmentDocket from './components/course/AssignmentDocket';
import ProjectDocket from './components/course/ProjectDocket';
import ChoreAssignment from './components/course/student/ChoreAssignment';
import ChoreProject from './components/course/student/ChoreProject';
import StudyMaterialDocket from './components/course/StudyMaterialDocket';
import Alert from './components/Alert';

const App = () => {
	useEffect(() => {
		store.dispatch(getAccount());
	}, []);

	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Alert />
					<Routes>
						<Route path="/" element={<SignIn />} />
						<Route path="/register" element={<SignUp />} />
						<Route path="/" element={<PrivateRoute />}>
							<Route path="courses" element={<CourseDocket />} />
							<Route path="courses/:course_id" element={<IndividualCourse />}>
								<Route path="" element={<AnnouncementDocket />} />
								<Route path="notes" element={<StudyMaterialDocket />} />
								<Route path="assignments" element={<AssignmentDocket />} />
								<Route path="project" element={<ProjectDocket />} />
								<Route
									path="chore/:chore_id/:chore_type"
									element={<ChoreSubmissions />}
								/>
								<Route
									path="submission/:student_id/assignment/:assignment_id"
									element={<IndividualSubmissionAssignment />}
								/>
								<Route
									path="submission/:student_id/project/:project_id"
									element={<IndividualSubmissionProject />}
								/>
								<Route
									path="assignments/performance"
									element={<ChoreAssignment />}
								/>
								<Route path="project/performance" element={<ChoreProject />} />
							</Route>
						</Route>
					</Routes>
				</Router>
			</Provider>
		</div>
	);
};

export default App;
