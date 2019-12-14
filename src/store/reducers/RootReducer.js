import {
    combineReducers
} from 'redux';

import { fetchDataReducer } from './HomeReducer';


const rootReducer = combineReducers({
    homeData: fetchDataReducer
})

export default rootReducer;