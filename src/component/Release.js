import React from "react";
import Modal from 'react-modal';
import ProjectDetails from './ProjectDetails/projectDetails';
import { Navbar } from 'reactstrap';
import "./Release.css";

export default class Release extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            isRelaseModalOpen: false,
            release_description: '',
            release_edate: '',
            release_sdate: '',
            release_name: '',
            showSelectedProjectDetils: false,
            selectedProject: '',
            isProjectSelected: false,
        }
    }

    onChangeInputBox(e, id) {
        if (id === 'release_name') {
            this.setState({ release_name: e.target.value });
        } else if (id === 'release_description') {
            this.setState({ release_description: e.target.value });
        } else if (id === 'release_sdate') {
            this.setState({ release_sdate: e.target.value });
        } else if (id === 'release_edate') {
            this.setState({ release_edate: e.target.value });
        }
    }
    showRelease = () => {
        this.setState({ isRelaseModalOpen: true });
    }
    hideRelease = () => {
        this.setState({ isRelaseModalOpen: false });
    }

    showSelectedProjectDetils = (e, item) => {
        if (this.props.showSelectedProjectDetils) {
            this.props.showSelectedProjectDetils(e, item);
        }
    }

    handleBackButtonClick = () => {
        this.setState({ showSelectedProjectDetils: false, isProjectSelected: true,  });
    }

    onChangeSelectBox = (e) => {
        this.setState({selectedProject: e.target.value, isProjectSelected: true});
    }

    releaseForm = () => {
        const { release_name, release_description, release_sdate, release_edate, selectedProject } = this.state;
        let obj = {
            "release_name": release_name, "release_description": release_description,
            "release_startDate": release_sdate, "release_endDate": release_edate
        }
      let projectList =  this.props.projectData.projectList ;
      
        projectList.forEach(element => {
            if(element.name === this.state.selectedProject) {
                 element.releases.push(obj);
            }
        })
        this.props.updateProjectDetails(projectList);
        this.setState({ isRelaseModalOpen: false });
    }

    showSelectedProjectDetils = (e, item) => {
        this.setState({ showSelectedProjectDetils: true, isProjectSelected: false });
    }

    render() {
        const { projectData } = this.props;
        const { showSelectedProjectDetils, isProjectSelected } = this.state;
        const renderRelease = [];
        const renderOptions = [];
        renderOptions.push(
            <option disabled selected> {"Select Project"}</option>
        )
        if (projectData && projectData.projectList && projectData.projectList.length) {
            projectData.projectList.forEach((item) => {
                renderOptions.push(
                    <option value={item.name}> {item.name}</option>
                )
                if(item.name === this.state.selectedProject) {
                    if (item.releases && item.releases.length) {
                        item.releases.forEach((release) => {
                            renderRelease.push(
                                <div className="col-sm-6 releaseDiv">
                                    <span className="releaseHeading" onClick={(e) => this.showSelectedProjectDetils(e, item)}>{"Name: "}{release.release_name}</span>
                                    <br></br>
                                    <span className="releaseHeading" onClick={(e) => this.showSelectedProjectDetils(e, item)}>{"StartDate: "}{release.release_startDate}</span>
                                    <br></br>
                                    <span className="releaseHeading" onClick={(e) => this.showSelectedProjectDetils(e, item)}>{"EndDate: "}{release.release_endDate}</span>
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
                    <div>
                        <Navbar expand="sm" className="navabar-main" >
                            <div className="dashboard">
                                Releases
    					</div>
                        </Navbar>
                        <div className="dashboard-divider" />
                    </div>
                 { !showSelectedProjectDetils ? <div className="SelectProject">
                        <div> <h6>{"Select Project: "}</h6></div>
                        <div className ="selectOptions">
                            <select onChange = {(e) => this.onChangeSelectBox(e)}>
                                {renderOptions}
                            </select>
                        </div>

                    </div>: "" }
                    {isProjectSelected ? <div className="container">
                        <div className="row">
                            {renderRelease}
                        </div>
                    </div> : ""}
                </div>

                {
                    showSelectedProjectDetils ?
                        <ProjectDetails
                            projectData ={ this.props.projectData}
                            handleBackButtonClick={this.handleBackButtonClick}
                            selectedProject={this.state.selectedProject}
                        /> : ""
                }
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
            </div>
        )
    }
}