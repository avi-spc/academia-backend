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

const App = () => {
	useEffect(() => {
		store.dispatch(getAccount());
	}, []);

	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Routes>
						<Route path="/" element={<SignIn />} />
						<Route path="/register" element={<SignUp />} />
						{['instructor', 'student'].map((path) => {
							return (
								<Route path={`/${path}`} element={<PrivateRoute />}>
									<Route path="courses" element={<CourseDocket />} />
									<Route
										path="courses/:course_id"
										element={<IndividualCourse />}
									/>
								</Route>
							);
						})}
					</Routes>
				</Router>
			</Provider>
		</div>
	);
};

export default App;
