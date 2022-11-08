import { combineReducers } from 'redux';

import auth from './reducers/auth';
import course from './reducers/course';
import performance from './reducers/performance';
import popup from './reducers/popup';

export default combineReducers({ auth, course, performance, popup });
