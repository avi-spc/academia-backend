import { combineReducers } from 'redux';

import alert from './reducers/alert';
import auth from './reducers/auth';
import course from './reducers/course';
import performance from './reducers/performance';
import popup from './reducers/popup';

export default combineReducers({ alert, auth, course, performance, popup });
