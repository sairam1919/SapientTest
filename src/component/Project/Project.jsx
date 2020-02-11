import React, { Component } from "react";
import Modal from 'react-modal';
import './Project.css';
import ProjectDetails from "../ProjectDetails/projectDetails";
import FeatureCreation from "../FeatureCreation/FeatureCreation";
import { Navbar, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
            projects: [{
                name: "Portal Current",
                description: "Portal",
                version: "1.00.00",
                releases: [{ "key": "Release1" }, { "key": "Release2" }],
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
                releases: [{ "key": "Release1" }],
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
            }],
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
    showRelease = () => {
        this.setState({ isRelaseModalOpen: true });
    }
    hideRelease = () => {
        this.setState({ isRelaseModalOpen: false });
    }
    createEpic = (sampleObj) => {
        switch (sampleObj.type) {
            case "epic":
                this.state.projects.forEach((elemnt, index) => {
                    if (elemnt.name === this.state.selectedProject) {
                        let temp = { "name": sampleObj.name, "description": sampleObj.description, capabilites: [] }
                        elemnt.epics.push(temp);
                    }
                })
                break;
            case "capability":
                this.state.projects.forEach((elemnt) => {
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
                this.state.projects.forEach((elemnt) => {
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
                this.state.projects.forEach((elemnt) => {
                    if (elemnt.name === this.state.selectedProject) {
                        elemnt.epics.forEach((epic) => {
                            if (epic.name === sampleObj.epicName) {
                                epic.capabilites.forEach((capability) => {
                                    if (capability.name === sampleObj.capabilityName) {
                                        capability.features.forEach((feature) => {
                                            if (feature.name === sampleObj.featureName) {
                                                let temp = { "name": sampleObj.name, "description": sampleObj.description, "team": sampleObj.team }
                                                capability.features.push(temp);
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
        this.setState({ projects: this.state.projects });
    }
    onChangeInputBox(e, id) {
        if (id === 'project_name') {
            this.setState({ project_name: e.target.value });
        } else if (id === 'project_description') {
            this.setState({ project_description: e.target.value });
        } else if (id === 'project_version') {
            this.setState({ project_version: e.target.value });
        } else if (id === 'release_name') {
            this.setState({ release_name: e.target.value });
        } else if (id === 'release_description') {
            this.setState({ release_description: e.target.value });
        } else if (id === 'release_sdate') {
            this.setState({ release_sdate: e.target.value });
        } else if (id === 'release_edate') {
            this.setState({ release_edate: e.target.value });
        }
    }
    saveProject() {
        this.props.saveProject(this.state);
    }

    projectForm = () => {
        this.state.projects.push({
            name: this.state.project_name,
            description: this.state.project_description,
            projectVersion: this.state.project_version,
            releases: []
        });
        this.setState({ isModalOpen: false })
    }
    releaseForm = () => {
        this.state.projects.forEach(element => {
            if (element.name === this.state.selectedProject) {
                element.releases.push({ "key": this.state.release_name });
            }
        });
    }

    showProjectDetails = (e, item) => {
        this.setState({ isProjectSelected: true, selectedProject: item.name });
    }

    showSelectedProjectDetils = (e, item) => {
        this.setState({ showSelectedProjectDetils: true, isProjectSelected: false });
    }

    handleBackButtonClick = () => {
        this.setState({ showSelectedProjectDetils: false, isProjectSelected: false });
    }

    render() {
        const { showModal } = this.props;
        const { projects, isProjectSelected, showSelectedProjectDetils, selectedProject } = this.state;
        const renderComponent = [];
        const renderRelease = [];
        const renderProjects = [];

        if (projects && projects.length) {
            projects.forEach((item) => {
                renderProjects.push(
                    <div className="col-sm-6 releaseDiv">
                        <div>
                            <span className="releaseHeading" onClick={(e) => this.showProjectDetails(e, item)}>{item.name}</span>
                            <br></br>
                            <span className="releaseDescription" onClick={(e) => this.showProjectDetails(e, item)}>{item.description}</span>
                            <br></br>
                            <span className="releaseVersion" onClick={(e) => this.showProjectDetails(e, item)}>{item.version}</span>
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

        if (projects && projects.length) {
            projects.forEach((item) => {
                if (item.name === this.state.selectedProject) {
                    renderComponent.push(
                        <div className="col-sm-12 timeLine">
                            <div>
                                <h3 onClick={this.handleBackButtonClick}>{item.name}</h3>
                            </div>
                        </div>
                    );
                    if (item.releases && item.releases.length) {
                        item.releases.forEach((release) => {
                            renderRelease.push(
                                <div className="col-sm-6 releaseDiv">
                                    <span className="releaseHeading" onClick={(e) => this.showSelectedProjectDetils(e, item)}>{release.key}</span>
                                </div>
                            );
                        })
                    }
                }
            });
        }

        renderRelease.push(
            <div className="col-sm-6 releaseDiv newDiv">
                <span className="newRelease" onClick={this.showRelease}>Create New Release ...</span>
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
                    {!isProjectSelected && !showSelectedProjectDetils ? <div className="leftSection">
                        <h5>Projects</h5>
                        <div className="container">
                            <div className="row">
                                {renderProjects}
                            </div> </div> <div>
                        </div>
                    </div> : ""
                    }
                    {!isProjectSelected && !showSelectedProjectDetils ? <div className="verticalLine"></div> : ""}
                    {!isProjectSelected && !showSelectedProjectDetils ? <div className="rightSection">
                        <h5>Releases</h5>
                        <div className="container">
                            <div >
                                <div className="row">
                                    {renderComponent}
                                </div>
                                <div className="row">
                                    {renderRelease}
                                </div> </div></div> </div> : ""}

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

                <Modal
                    isOpen={this.state.isRelaseModalOpen}
                    style={this.state.projectCreationCSS}
                    ariaHideApp={false}
                >
                    <div className="create-project-header">
                        <a className="project-cross-symbol" onClick={this.hideRelease}>X</a>
                        <h4>Create New Release</h4>
                    </div>
                    <div className="create-project-body">
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Release Name</label>
                            <input type="text" className="input-box" placeholder="Release Name" value={this.state.release_name} onChange={(e) => this.onChangeInputBox(e, 'release_name')} />
                        </div>
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Release Description</label>
                            <input type="text" className="input-box" placeholder="Release Description" value={this.state.release_description} onChange={(e) => this.onChangeInputBox(e, 'release_description')} />
                        </div>
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Release Start Date</label>
                            <input type="date" className="input-box" placeholder="Start Date" value={this.state.release_sdate} onChange={(e) => this.onChangeInputBox(e, 'release_sdate')} />
                        </div>
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Release End Date</label>
                            <input type="date" className="input-box" placeholder="End Date" value={this.state.release_edate} onChange={(e) => this.onChangeInputBox(e, 'release_edate')} />
                        </div>
                    </div>
                    <div className="crate-project-footer">
                        <button className="c-btn c-btn-cancle" onClick={this.hideRelease}>Cancle</button>
                        <button className="c-btn c-btn-save" onClick={this.releaseForm} >Save</button>
                    </div>
                </Modal>


                {
                    isProjectSelected && !showSelectedProjectDetils ?
                        <FeatureCreation
                            projects={this.state.projects}
                            createEpic={this.createEpic}
                            Teams={this.state.Teams}
                            selectedProject={selectedProject}
                            handleBackButtonClick={this.handleBackButtonClick}
                        /> : ""
                }
                {
                    showSelectedProjectDetils ?
                        <ProjectDetails
                            handleBackButtonClick={this.handleBackButtonClick}
                            selectedProject={this.state.selectedProject}
                        /> : ""
                }
            </div >
        )
    }
}

export default Project;