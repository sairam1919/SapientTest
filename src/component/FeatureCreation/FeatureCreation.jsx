import React, { Component } from 'react';
import Modal from 'react-modal';

export default class FeatureCreation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
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
            showDropDown: false,
            name: "",
            description: "",
            team: "",
            type: "epics",
            sampleObj: [],
            selectedEpic: "",
            selectedCapability: "",
            selectedFeature: "",
            showEpics: true,
            showCapabilites: false,
            showFeatures: false,
            showUserStories: false,
        }
    }
    handlecreation = (e, name) => {
        this.setState({ type: name, isModalOpen: true });
    }

    hide = () => {
        this.setState({ isModalOpen: false });
    }

    createEpic = () => {
        let sampleObj =
        {
            "name": this.state.name, "description": this.state.description, "type": this.state.type,
            "team": this.state.team, "epicName": this.state.selectedEpic, "capabilityName": this.state.selectedCapability,
            "featureName": this.state.selectedFeature
        };
        this.props.createEpic(sampleObj)
        this.setState({ isModalOpen: false, name: '', description: '', team: '' });
    }

    onChangeInputBox(e, id) {
        if (id === 'name') {
            this.setState({ name: e.target.value });
        } else if (id === 'description') {
            this.setState({ description: e.target.value });
        } else if (id === 'team') {
            this.setState({ team: e.target.value });
        }
    }

    showDropDown() {
        this.setState({ showDropDown: true });
    }
    handleShow = (e, name, data) => {
        console.log(name, data);
        switch (name) {
            case "epic":
                this.setState({ type: "capabilities", showEpics: false, showCapabilites: true, showFeatures: false, showUserStories: false, selectedEpic: data.name })
                break;
            case "capability":
                this.setState({ type: "Features", showEpics: false, showCapabilites: false, showFeatures: true, showUserStories: false, selectedCapability: data.name })
                break;
            case "feature":
                this.setState({ type: "UserStorys", showEpics: false, showCapabilites: false, showFeatures: false, showUserStories: true, selectedFeature: data.name })
                break;
            case "userstories":
                this.setState({ showEpics: false, showCapabilites: false, showFeatures: false, showUserStories: true })
                break;
        }
    }

    render() {
        const { Teams, projectData, selectedProject } = this.props;
        const { showEpics, showCapabilites, showFeatures, showUserStories } = this.state;
        const renderDropdownElements = [];
        const renderEpics = [];
        const renderCapabilites = [];
        const renderFeatures = [];
        const renderUserStories = [];
        let projects = projectData && projectData.projectList;
        if (projects && projects.length) {
            projects.forEach((elemnt) => {
                if (elemnt.name === selectedProject) {

                    if (elemnt.epics && elemnt.epics.length) {
                        elemnt.epics.forEach((epic) => {
                            renderEpics.push(
                                <div className="col-sm-3 releaseDiv">
                        <span className="newRelease" onClick={(e) => this.handleShow(e, 'epic', epic)}><span className = "key">{"Name: "}</span>{epic.name}</span>
                                    <br></br>
                                    <span className="newRelease" onClick={(e) => this.handleShow(e, 'epic', epic)}><span className = "key">{"Description: "}</span>{epic.description}</span>
                                </div>
                            );
                            if (epic.capabilites && epic.capabilites.length) {
                                epic.capabilites.forEach((capability) => {
                                    renderCapabilites.push(
                                        <div className="col-sm-3 releaseDiv">
                                            <span className="newRelease" onClick={(e) => this.handleShow(e, 'capability', capability)}><span className = "key">{"Name: "}</span>{capability.name}</span>
                                            <br></br>
                                            <span className="newRelease" onClick={(e) => this.handleShow(e, 'capability', capability)}><span className = "key">{"Description: "}</span>{capability.description}</span>
                                        </div>
                                    );
                                    if (capability.features && capability.features.length) {
                                        capability.features.forEach((feature) => {
                                            renderFeatures.push(
                                                <div className="col-sm-3 releaseDiv">
                                                    <span className="newRelease" onClick={(e) => this.handleShow(e, 'feature', feature)}><span className = "key">{"Name: "}</span>{feature.name}</span>
                                                    <br></br>
                                                    <span className="newRelease" onClick={(e) => this.handleShow(e, 'feature', feature)}><span className = "key">{"Description: "}</span>{feature.description}</span>
                                                    <br></br>
                                                    <span className="newRelease" onClick={(e) => this.handleShow(e, 'feature', feature)}><span className = "key">{"Sprint Team: "}</span>{feature.team}</span>
                                                </div>
                                            );
                                            if (feature.userstories && feature.userstories.length) {
                                                feature.userstories.forEach((userstory) => {
                                                    renderUserStories.push(
                                                        <div className="col-sm-3 releaseDiv">
                                                            <span className="newRelease" onClick={(e) => this.handleShow(e, 'userstory', userstory)}><span className = "key">{"Name: "}</span>{userstory.name}</span>
                                                            <br></br>
                                                            <span className="newRelease" onClick={(e) => this.handleShow(e, 'userstory', userstory)}><span className = "key">{"Description: "}</span>{userstory.description}</span>
                                                            <br></br>
                                                            <span className="newRelease" onClick={(e) => this.handleShow(e, 'userstory', userstory)}><span className = "key">{"Sprint Team: "}</span>{userstory.team}</span>
                                                        </div>
                                                    );
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                }
            })
        }
        renderEpics.push(
            <div className="col-sm-3 releaseDiv newDiv">
                <span className="newRelease" onClick={(e) => this.handlecreation(e, 'epic')}>Create Epic</span>
            </div>
        )
        renderCapabilites.push(
            <div className="col-sm-3 releaseDiv newDiv">
                <span className="newRelease" onClick={(e) => this.handlecreation(e, 'capability')}>Create Capability</span>
            </div>
        )
        renderFeatures.push(
            <div className="col-sm-3 releaseDiv newDiv">
                <span className="newRelease" onClick={(e) => this.handlecreation(e, 'feature')}>Create Feature</span>
            </div>
        )
        renderUserStories.push(
            <div className="col-sm-3 releaseDiv newDiv">
                <span className="newRelease" onClick={(e) => this.handlecreation(e, 'userstory')}>Create UserStory</span>
            </div>
        )

        Teams.forEach((elmnt) => {
            renderDropdownElements.push(
                <option value={elmnt} >{elmnt}</option>
            );
        })

        return (
            <div>
                <div className="container">
                    <div className="row mainDiv">
                        <span className="Projectname" onClick={this.props.handleBackButtonClick}>{this.props.selectedProject} | {this.state.type.toUpperCase()}</span>
                    </div>
                    {showEpics ? <div className="row">
                        {renderEpics}
                    </div> : ""}
                    {showCapabilites ? <div className="row">
                        {renderCapabilites}
                    </div> : ""}
                    {showFeatures ? <div className="row">
                        {renderFeatures}
                    </div> : ""}
                    {showUserStories ? <div className="row">
                        {renderUserStories}
                    </div> : ""}
                </div>

                <Modal
                    isOpen={this.state.isModalOpen}
                    style={this.state.projectCreationCSS}
                    ariaHideApp={false}
                >
                    <div className="create-project-header">
                        <a className="project-cross-symbol" onClick={this.hide}>X</a>
                        <h4>{this.state.modalHeader}</h4>
                    </div>
                    <div className="create-project-body">
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Name </label>
                            <input type="text" className="input-box" placeholder="name" value={this.state.name} onChange={(e) => this.onChangeInputBox(e, 'name')} />
                        </div>
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Description</label>
                            <textarea className="input-box" placeholder="description" value={this.state.description} onChange={(e) => this.onChangeInputBox(e, 'description')} />
                        </div>
                        {this.state.type === "feature" || this.state.type === "userstory" ? <div className="create-project-fields">
                            <label className="create-project-input-label">Sprint Team</label>
                            <div className="dropdown">
                                <select
                                    value={this.state.team}
                                    onChange={(e) => this.onChangeInputBox(e, 'team')}>
                                    {renderDropdownElements}
                                </select>
                            </div>
                        </div>
                            : ""}
                    </div>
                    <div className="crate-project-footer">
                        <button className="c-btn c-btn-cancle" onClick={this.hide}>Cancle</button>
                        <button className="c-btn c-btn-save" onClick={this.createEpic} >Create</button>
                    </div>
                </Modal>
            </div>
        );
    }
}