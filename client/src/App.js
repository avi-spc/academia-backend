import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reduxStore/store';
import { getInstructor } from './reduxStore/actions/auth';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/PrivateRoute';
import CourseDocket from './components/course/CourseDocket';

const App = () => {
	useEffect(() => {
		store.dispatch(getInstructor());
	}, []);

	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Routes>
						<Route path="/" element={<SignIn />} />
						<Route path="/register" element={<SignUp />} />
						<Route path="/instructor" element={<PrivateRoute />}>
							<Route path="courses" element={<CourseDocket />} />
						</Route>
					</Routes>
				</Router>
			</Provider>
		</div>
	);
};

export default App;
