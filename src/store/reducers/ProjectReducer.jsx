import { HomeConstants } from "../../utils/Constants";
const projectList = [{
    name: "Portal Current",
    description: "Portal",
    version: "1.00.00",
    releases: [{ "release_name": "Release1" , "release_description": "Test Release" , "release_startDate": null, "release_endDate": null}],
    epics: [{
        name: "Dashboard", description: "Dahsboard module", capabilites: [
            {
                name: "Side Menu", description: "Menu bar", features: [
                    {
                        name: "Icons", description: "Side Menu ICons", team: "Greedo", userstories: [
                            { name: "Icon", description: "Each Icon Functionality", team: "Greedo", type:"backlog" }
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
        name: "Module Platform", description: "Module Export Epic", capabilites: [
            {
                name: "Module Export", description: "Export Capability", features: [
                    {
                        name: "Module Feature", description: "Feature", team: "Greedo", userstories: [
                            { name: "Module User Story", description: "Userstory", team: "Skywalker", type:"backlog" }
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