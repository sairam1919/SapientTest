import React,{ Component } from "react";
import Modal from 'react-modal';
import './Project.css';

export class Project extends Component{
    constructor(props){
        super(props);
        this.state = {
            project_name:'',
            project_description:'',
            project_version:'',
            projectCreationCSS:{
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
                }
            }
        }
        // this.onChangeInputBox = this.onChangeInputBox.bind(this);
    }
    closeProjectModel(){
        this.props.toggleProjectModel();
    }
    onChangeInputBox(e,id){
        if(id === 'project_name'){
            this.setState({project_name:e.target.value});
            // const val = nameValidation(this.state.email);
            // this.setState({nameValidationError:val}) ;
        }else if(id === 'project_description'){
            this.setState({project_description:e.target.value});
        }else if(id === 'project_version'){
            this.setState({project_version:e.target.value});
        }
    }
    saveProject(){
        this.props.saveProject(this.state);
    }
    render(){
        const {showModal} = this.props;
        return(
            <div>
                <Modal 
                    isOpen={showModal}
                    style={this.state.projectCreationCSS}
                    ariaHideApp={false}
                >
                    <div className="create-project-header">
                        <a className="project-cross-symbol" onClick={()=>this.closeProjectModel()}>X</a>
                        <h4>Create New Project</h4>
                    </div>
                    <div className="create-project-body">
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Project Name</label>
                            <input type="text" className="input-box" placeholder="Project Name" value={this.state.project_name} onChange={(e)=>this.onChangeInputBox(e,'project_name')}/>
                        </div>
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Project Description</label>
                            <input type="text" className="input-box" placeholder="Project Description" value={this.state.project_description} onChange={(e)=>this.onChangeInputBox(e,'project_description')} />
                        </div>
                        <div className="create-project-fields">
                            <label className="create-project-input-label">Project Version</label>
                            <input type="text" className="input-box" placeholder="Project Version" value={this.state.project_version} onChange={(e)=>this.onChangeInputBox(e,'project_version')}/>
                        </div>
                    </div>
                    <div className="crate-project-footer">
                        <button className="c-btn c-btn-cancle" onClick={()=>this.closeProjectModel()}>Cancle</button>
                        <button className="c-btn c-btn-save" onClick={()=>this.saveProject()} >Save</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Project;