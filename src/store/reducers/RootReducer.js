import {
    combineReducers
} from 'redux';

import { fetchDataReducer } from './HomeReducer';
import { signInReducer } from './SignInReducer';
import { projectReducer } from './ProjectReducer';


const rootReducer = combineReducers({
    homeData: fetchDataReducer,
    signInData: signInReducer,
    projectData: projectReducer
})

export default rootReducer;