import { HomeConstants } from "../../utils/Constants";
const projectList = [{
    name: "Portal Current",
    description: "Portal",
    version: "1.00.00",
    releases: [{ "release_name": "Release1" , "release_description": "release1" , "release_startDate": null, "release_endDate": null}],
    epics: [{
        name: "Test", description: "Test", capabilites: [
            {
                name: "Test", description: "Test", features: [
                    {
                        name: "Test", description: "Test", team: "Greedo", userstories: [
                            { name: "Test", description: "Test", team: "Greedo" }
                        ]
                    }
                ]
            }
        ]
    }]
},
{
    name: "Platform Current",
    description: "Platform",
    version: "3.00.00",
    releases: [],
    epics: [{
        name: "Test1", description: "Test1", capabilites: [
            {
                name: "Test1", description: "Test1", features: [
                    {
                        name: "Test1", description: "Test1", team: "Greedo", userstories: [
                            { name: "Test1", description: "Test1", team: "Skywalker" }
                        ]
                    }
                ]
            }
        ]
    }],
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

        case HomeConstants.PROJECT_DETAILS:
            return {
                ...state,
                projectList: action.projectDetails
            }
        default:
                return {
                    ...state
                };
    }
}