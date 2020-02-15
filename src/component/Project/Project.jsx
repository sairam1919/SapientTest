import React, { Component } from "react";
import Modal from 'react-modal';
import './Project.css';
import FeatureCreation from "../FeatureCreation/FeatureCreation";
import { Navbar } from 'reactstrap';

export class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_name: '',
            project_description: '',
            project_version: '',
            projectCreationCSS: {
                overlay: {
                    position: 'fixed',
                    top: 268,
                    left: 0,
                    right: 0,
                    bottom: 315,
                    backgroundColor: '#dfdfec'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    height: '434px',
                    width: '550px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.05), 0 30px 40px 0 rgba(0,0,0,0.2)'
                },
            },
            isModalOpen: false,
            isProjectSelected: false,
            selectedProject: "",
            showSelectedProjectDetils: false,
            isRelaseModalOpen: false,
            release_description: '',
            release_edate: '',
            release_sdate: '',
            release_name: '',
            Teams: ["Greedo", "Dhrona", "Falcon", "Skywalker"],
        }
    }
    closeProjectModel() {
        this.props.toggleProjectModel();
    }
    show = () => {
        this.setState({ isModalOpen: true });
    }
    hide = () => {
        this.setState({ isModalOpen: false });
    }

    createEpic = (sampleObj) => {
        switch (sampleObj.type) {
            case "epic":
                this.props.projectData.projectList.forEach((elemnt, index) => {
                    if (elemnt.name === this.state.selectedProject) {
                        let temp = { "name": sampleObj.name, "description": sampleObj.description, capabilites: [] }
                        elemnt.epics.push(temp);
                    }
                })
                break;
            case "capability":
                this.props.projectData.projectList.forEach((elemnt) => {
                    if (elemnt.name === this.state.selectedProject) {
                        elemnt.epics.forEach((epic) => {
                            if (epic.name === sampleObj.epicName) {
                                let temp = { "name": sampleObj.name, "description": sampleObj.description, features: [] }
                                epic.capabilites.push(temp);
                            }
                        })
                    }
                })
                break;
            case "feature":
                this.props.projectData.projectList.forEach((elemnt) => {
                    if (elemnt.name === this.state.selectedProject) {
                        elemnt.epics.forEach((epic) => {
                            if (epic.name === sampleObj.epicName) {
                                epic.capabilites.forEach((capability) => {
                                    if (capability.name === sampleObj.capabilityName) {
                                        let temp = { "name": sampleObj.name, "description": sampleObj.description, "team": sampleObj.team, userstories: [] }
                                        capability.features.push(temp);
                                    }
                                })
                            }
                        })
                    }
                })
                break;
            case "userstory":
                this.props.projectData.projectList.forEach((elemnt) => {
                    if (elemnt.name === this.state.selectedProject) {
                        elemnt.epics.forEach((epic) => {
                            if (epic.name === sampleObj.epicName) {
                                epic.capabilites.forEach((capability) => {
                                    if (capability.name === sampleObj.capabilityName) {
                                        capability.features.forEach((feature) => {
                                            if (feature.name === sampleObj.featureName) {
                                                let temp = { "name": sampleObj.name, "description": sampleObj.description, "team": sampleObj.team }
                                                feature.userstories.push(temp);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                break;
        }
        this.setState({ projects: this.props.projectData.projectList });
    }
    onChangeInputBox(e, id) {
        if (id === 'project_name') {
            this.setState({ project_name: e.target.value });
        } else if (id === 'project_description') {
            this.setState({ project_description: e.target.value });
        } else if (id === 'project_version') {
            this.setState({ project_version: e.target.value });
        }
    }
    saveProject() {
        this.props.saveProject(this.state);
    }

    projectForm = () => {
        this.props.saveProject({
            name: this.state.project_name,
            description: this.state.project_description,
            version: this.state.project_version,
            releases: []
        });
        this.setState({ isModalOpen: false })
    }

    showProjectDetails = (e, item) => {
        this.setState({ isProjectSelected: true, selectedProject: item.name });
    }

    handleBackButtonClick = () => {
        this.setState({ showSelectedProjectDetils: false, isProjectSelected: false });
    }

    render() {
        const { projectData } = this.props;
        const { isProjectSelected, showSelectedProjectDetils, selectedProject } = this.state;
        const renderProjects = [];
        const projectList = projectData && projectData.projectList;

        if (projectList && projectList.length) {
            projectList.forEach((item) => {
                renderProjects.push(
                    <div className="col-sm-6 releaseDiv">
                        <div>
                            <span className="releaseHeading" onClick={(e) => this.showProjectDetails(e, item)}>{"Name: "}{item.name}</span>
                            <br></br>
                            <span className="releaseDescription" onClick={(e) => this.showProjectDetails(e, item)}>{"Description: "}{item.description}</span>
                            <br></br>
                            <span className="releaseVersion" onClick={(e) => this.showProjectDetails(e, item)}>{"Version: "}{item.version}</span>
                        </div>
                    </div>
                );
            });
        }

        renderProjects.push(
            <div className="col-sm-6 releaseDiv newDiv">
                <span className="newRelease" onClick={this.show}>Create New Project ...</span>
            </div>
        );

        return (
            <div>
                <div>
                    <Navbar expand="sm" className="navabar-main" >
                        <div className="dashboard">
                            Projects
    					</div>
                    </Navbar>
                    <div className="dashboard-divider" />
                </div>
                <div className="main">
                    {!isProjectSelected && !showSelectedProjectDetils ? <div>
                        <h5>Projects</h5>
                        <div className="container">
                            <div className="row">
                                {renderProjects}
                            </div> </div> <div>
                        </div>
                    </div> : ""
                    }
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    style={this.state.projectCreationCSS}
                    ariaHideApp={false}
                >
                    <div className="create-project-header">
                        <a className="project-cross-symbol" onClick={this.hide}>X</a>
                        <h4>Create New Project</h4>
                    </div>
                    <div className="create-project-body">
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Project Name</label>
                            <input type="text" className="input-box" placeholder="Project Name" value={this.state.project_name} onChange={(e) => this.onChangeInputBox(e, 'project_name')} />
                        </div>
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Project Description</label>
                            <input type="text" className="input-box" placeholder="Project Description" value={this.state.project_description} onChange={(e) => this.onChangeInputBox(e, 'project_description')} />
                        </div>
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Project Version</label>
                            <input type="text" className="input-box" placeholder="Project Version" value={this.state.project_version} onChange={(e) => this.onChangeInputBox(e, 'project_version')} />
                        </div>
                    </div>
                    <div className="crate-project-footer">
                        <button className="c-btn c-btn-cancle" onClick={this.hide}>Cancle</button>
                        <button className="c-btn c-btn-save" onClick={this.projectForm} >Save</button>
                    </div>
                </Modal>

                {
                    isProjectSelected && !showSelectedProjectDetils ?
                    <FeatureCreation
                        projectData={this.props.projectData}
                        createEpic={this.createEpic}
                        Teams={this.state.Teams}
                        selectedProject={selectedProject}
                        handleBackButtonClick={this.handleBackButtonClick}
                    /> : ""
                }
            </div >
        )
    }
}

export default Project;
