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

export function updateProject(project){
    return{
        type:HomeConstants.PROJECT_SUCCESS,
        project
    }
}

export function updateProjectDetails(projectDetails) {
    return {
        type: HomeConstants.PROJECT_DETAILS,
        projectDetails
    }
}