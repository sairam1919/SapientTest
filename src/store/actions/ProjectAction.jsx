import { HomeConstants } from "../../utils/Constants";

export function saveProject(project){
    return{
        type:HomeConstants.PROJECT_SUCCESS,
        project
    }
}
export function fetchProjects(){
    return{
        type:HomeConstants.PROJECT_LIST,
    }
}