import { HomeConstants } from "../../utils/Constants";
const projectList = [{
    'project_name':'Project_1',
    'project_description':'Project Description_1',
    'project_version':'1.0.0.0'
}];
export function projectReducer(state = {projectList},action){
    const newState = {};
    switch(action.type){
        case HomeConstants.PROJECT_LIST:
               return {
                    ...state
                };
        case HomeConstants.PROJECT_SUCCESS:
                return {
                    ...state,
                    projectList:[...state.projectList, action.project]
                };
        case HomeConstants.PROJECT_FAILED:
                return {
                    ...state
                };
        default:
                return {
                    ...state
                };
    }
}