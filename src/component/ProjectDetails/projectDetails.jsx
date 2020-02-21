import React, { Component } from 'react';
import Modal from 'react-modal';
import './projectDetails.css';

export default class ProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectData: this.props.projectData,
            isModalOpen: false,
            selectedStory: '',
            projectCreationCSS: {
                overlay: {
                    position: 'fixed',
                    top: 268,
                    left: 0,
                    right: 0,
                    bottom: 315,
                    backgroundColor: 'none'
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
        }
    }

    show = (e, name) => {
        this.setState({ isModalOpen: true, selectedStory: name });
    }
    hide = () => {
        this.setState({ isModalOpen: false });
    }
    eventLogger = (e, data) => {
    };

    onDragStart = (event, name) => {
        event.dataTransfer.setData("name", name);
    }
    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event, cat) => {
        let taskName = event.dataTransfer.getData("name");
        const { selectedProject } = this.props;
        let { projectData } = this.state;
        if (projectData && projectData.projectList && projectData.projectList.length) {
            projectData.projectList.forEach((elemnt) => {
                if (elemnt.name === selectedProject) {
                    elemnt.epics.forEach((epic) => {
                        epic.capabilites.forEach((capability) => {
                            capability.features.forEach((feature) => {
                                feature.userstories.forEach((userstory) => {
                                    if (userstory.name == taskName) {
                                        userstory.type = cat;
                                    }
                                })
                            })
                        })
                    })
                }
            })
        }

        this.setState({
            ...this.state,
            projectData
        });

    }

    render() {
        var tasks = {
            backlog: [],
            inprogress: [],
            testing: [],
            completed: [],
            buglist: []
        }
        const { selectedProject } = this.props;
        const { projectData } = this.state;

        if (projectData && projectData.projectList && projectData.projectList.length) {
            projectData.projectList.forEach((elemnt) => {
                if (elemnt.name === selectedProject) {
                    elemnt.epics.forEach((epic) => {
                        epic.capabilites.forEach((capability) => {
                            capability.features.forEach((feature) => {
                                feature.userstories.forEach((userstory) => {
                                    tasks[userstory.type].push(
                                        <div
                                            key={userstory.name}
                                            onDragStart={(event) => this.onDragStart(event, userstory.name)}
                                            draggable
                                            className="draggable subStories"
                                            onClick= {(e) => this.show(e, userstory.name)}
                                            >
                                            <div><span className="subStoriesHeading">{userstory.name}</span></div>
                                            <div>
                                                <span title="Edit" className="contentIcons"><i class="fa fa-edit"></i></span>
                                                <span title="Comments" className="contentIcons"><i class="fa fa-comment"></i></span>
                                            </div>
                                        </div>
                                    )
                                })
                            })
                        })
                    })
                }
            })
        }
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mainDiv">
                        <span className="Projectname" onClick={this.props.handleBackButtonClick}>{selectedProject}</span>
                        <span className="teamSize"> 8 Members</span>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 contentDiv" onDragOver={(event) => this.onDragOver(event)}
                            onDrop={(event) => { this.onDrop(event, "backlog") }}>
                            <h4 className="contentHeading" >Backlogs</h4>
                            {tasks.backlog}
                        </div>
                        <div className="col-sm-2 contentDiv" onDragOver={(event) => this.onDragOver(event)}
                            onDrop={(event) => { this.onDrop(event, "inprogress") }}>
                            <h4 className="contentHeading" >InProgress</h4>
                            {tasks.inprogress}
                        </div>
                        <div className="col-sm-2 contentDiv" onDragOver={(event) => this.onDragOver(event)}
                            onDrop={(event) => { this.onDrop(event, "testing") }}>
                            <h4 className="contentHeading">Testing</h4>
                            {tasks.testing}
                        </div>
                        <div className="col-sm-2 contentDiv" onDragOver={(event) => this.onDragOver(event)}
                            onDrop={(event) => { this.onDrop(event, "completed") }}>
                            <h4 className="contentHeading">Completed</h4>
                            {tasks.completed}
                        </div>
                        <div className="col-sm-2 contentDiv" onDragOver={(event) => this.onDragOver(event)}
                            onDrop={(event) => { this.onDrop(event, "buglist") }}>
                            <h4 className="contentHeading">BugList</h4>
                            {tasks.buglist}
                        </div>
                    </div>
                </div>

                <div className="navModal">
                    <Modal
                        isOpen={this.state.isModalOpen}
                        style={this.state.projectCreationCSS}
                        ariaHideApp={false}>
                        <div className="app-modal-header">
                            <h3>{this.state.selectedStory}</h3>
                        </div>
                        <div className="app-modal-body">
                            <div className="row">
                                <div className="col-sm-8">
                                    <span> Edit the Description </span>

                                    <div className="">
                                        <h3>Add Comment</h3>
                                        <textarea name="name" rows="3" cols="50"></textarea>
                                        <button type="button" className="btn btn-default" name="button">Save</button>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <h3>Add</h3>
                                    <ul>
                                        <li><span><i class="fa fa-user"></i></span>Members</li>
                                        <li><span><i class="fa fa-copy"></i></span>Labels</li>
                                        <li><span><i class="fa fa-check"></i></span>Checklist</li>
                                        <li><span><i class="fa fa-calendar"></i></span>Due Date</li>
                                        <li><span><i class="fa fa-paperclip"></i></span>Attachment</li>
                                    </ul>
                                    <h3>Actions</h3>
                                    <ul>
                                        <li><span><i class="fa fa-copy"></i></span>Copy</li>
                                        <li><span><i class="fa fa-archive"></i></span>Archive</li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                        <div className="app-modal-footer">
                            <button type="button" className="btn btn-success" onClick={this.hide}>Submit</button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}
