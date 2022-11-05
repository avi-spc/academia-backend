import Chore from './components/create/Chore';
import CourseCard from './components/course/CourseCard';
import CourseDocket from './components/course/CourseDocket';
import IndividualCourse from './components/course/IndividualCourse';
import Course from './components/create/Course';
import Navbar from './components/header/Navabr';
import Announcement from './components/create/Announcement';
import Discussion from './components/create/Discussion';

const App = () => {
	return (
		<div className="App">
			<Navbar />
			<Discussion />
		</div>
	);
};

export default App;
