import React, { Component } from 'react';
import Modal from 'react-modal';
import './projectDetails.css';

export default class ProjectDetails extends Component {
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
        }
    }

    show = () => {
        this.setState({ isModalOpen: true });
    }
    hide = () => {
        this.setState({ isModalOpen: false });
    }
    eventLogger = (e, data) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };

    render() {
        const { projectData, selectedProject } = this.props;
        let renderUserstories = [];
        if (projectData && projectData.projectList && projectData.projectList.length) {
            projectData.projectList.forEach((elemnt) => {
                if (elemnt.name === selectedProject) {
                    elemnt.epics.forEach((epic) => {
                        epic.capabilites.forEach((capability) => {
                            capability.features.forEach((feature) => {
                                feature.userstories.forEach((userstory) => {
                                    console.log("UserStories Length", userstory);
                                    renderUserstories.push(
                                        <div className="subStories">
                                            <div><span className="subStoriesHeading" onClick={this.show} >{userstory.name}</span></div>
                                            <div>
                                                <span title="Edit" className="glyphicon glyphicon-edit contentIcons"></span>
                                                <span title="Checklist" className="glyphicon glyphicon-check contentIcons"> <b>2/3</b></span>
                                                <span title="Comments" className="glyphicon glyphicon-comment contentIcons"></span>
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
                        <span className="glyphicon glyphicon-star-empty starIcon"></span>
                        <span className="teamSize"> 8 Members</span>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 contentDiv">
                            <h4 className="contentHeading">Backlogs</h4>
                            {renderUserstories}
                        </div>
                        <div className="col-sm-2 contentDiv">
                            <h4 className="contentHeading">InProgress</h4>
                        </div>
                        <div className="col-sm-2 contentDiv">
                            <h4 className="contentHeading">Testing</h4>
                        </div>
                        <div className="col-sm-2 contentDiv">
                            <h4 className="contentHeading">Completed</h4>
                        </div>
                        <div className="col-sm-2 contentDiv">
                            <h4 className="contentHeading">Bug List</h4>
                        </div>
                    </div>
                </div>

                <div className="navModal">
                    <Modal
                        isOpen={this.state.isModalOpen}
                        style={this.state.projectCreationCSS}
                        ariaHideApp={false}>
                        <div className="app-modal-header">
                            <h3>story 1</h3>
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
                                <div className="col-sm-2">
                                    <h3>Add</h3>
                                    <ul>
                                        <li><span className="glyphicon glyphicon-user"></span>Members</li>
                                        <li><span className="glyphicon glyphicon-copy"></span>Labels</li>
                                        <li><span className="glyphicon glyphicon-check"></span>Checklist</li>
                                        <li><span className="glyphicon glyphicon-eye-open"></span>Due Date</li>
                                        <li><span className="glyphicon glyphicon-paperclip"></span>Attachment</li>
                                    </ul>
                                    <h3>Actions</h3>
                                    <ul>
                                        <li><span className="glyphicon glyphicon-arrow-right"></span>Move</li>
                                        <li><span className="glyphicon glyphicon-copy"></span>Copy</li>
                                        <li><span className="glyphicon glyphicon-eye-open"></span>Follow</li>
                                        <li><span className="glyphicon glyphicon-floppy-disk"></span>Archive</li>
                                    </ul>
                                    <a href="">share and more...</a>
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
