import React, { Component } from "react";
import { connect } from 'react-redux';
import './NavBar.css';
import ReactTooltip from 'react-tooltip';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {Dropdown as DD}  from 'react-dropdown'
import 'react-dropdown/style.css'
const options = [
    'one', 'two', 'three'
  ]
const defaultOption = options[0]


export class NavBar extends Component{
    constructor(props){
        super(props);
        this. state = {
            dropdownOpen: false,
            projectDropdownOpen:false
        }
        this.toggle = this.toggle.bind(this);
        this.projectToggle = this.projectToggle.bind(this);
    }
    gotoModule(e,module){
        console.log("module:",module);
        if(this.props.setModule){
            console.log("module.....", module);
            this.props.setModule(module);
        }
    }
    // userOperations(){
    //     onClick={()=>this.userOperations()}
    // }fetchProjects
    toggle() {
    	this.setState({
    		dropdownOpen: !this.state.dropdownOpen
    	});
    }
    projectToggle() {
    	this.setState({
    		projectDropdownOpen: !this.state.projectDropdownOpen
    	});
    }
    logOut(){
        this.props.logOut(this.state);
    }
    gotoComponent(projectName){
        console.log(projectName);
    }
    createProject(){
        this.props.toggleProjectModel();
    }
    render(){
        const {signInData,projectData} = this.props;
        let items = [];
        projectData.projectList && projectData.projectList.forEach( (item) => {
            items.push(<DropdownItem >{item.project_name}</DropdownItem>) 
        });
        return(
            <div className="app-wrapper">
                <div className="nav-wrapper">
                    <div className="top-nav-container">
                        <div className="navbar-brand-left">
                            <ul className="icon-compname">
                                <li className="comp-icon"> </li>
                                <li className="comp-name">JARA </li>
                            </ul>
                        </div>
                        <div className="navbar-middle">
                            <ul className="dashboard-heading">
                                <li>
                                    <a>
                                    <Dropdown drop='right' className="topnavbar-project-dropdown" isOpen={ this.state.projectDropdownOpen } toggle={ this.projectToggle }>
    								<DropdownToggle
    									tag="span"
    									data-toggle="dropdown"
    									aria-expanded={ this.state.projectDropdownOpen }
    								>
                                        {/* <div>Projects <div className="arrow-symboll"></div></div> */}
                                        
    								</DropdownToggle>
    								<div className="menuarea">
                                    { this.state.projectDropdownOpen ? <div className="carddrop-withoutborder"></div> : ''}
    									<DropdownMenu className="topnavbar-project-dropdown-window">
                                        {/* <DropdownItem onClick={()=>this.gotoComponent('orchestration')} >Orchestration</DropdownItem>
                                        <DropdownItem >Device Management</DropdownItem>
                                        <DropdownItem >Alarms Management</DropdownItem>
                                        <DropdownItem >Backup Management</DropdownItem>
                                        <DropdownItem >User Management</DropdownItem> */}
                                        {items}
    									</DropdownMenu>
    								</div>
    							</Dropdown>
                                    </a>
                                </li>
                                {/* <li><a>Teams</a></li> */}
                                {/* <li onClick={()=>this.createProject()}><a>Create Project</a></li> */}
                            </ul>
                        </div>
                        <div className="navbar-right">
                            <ul className="user-operations">
                                <li className="nav-search">
                                    <input type="text" placeholder="Search" />
                                </li>
                                <div className="devider"></div>
                                <li className="nav-notify-icon" data-tip="Notifications"></li>
                                <div className="devider"></div>
                                <li className="user-iocn-li">
                               
                               <Dropdown drop='right' isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
    								<DropdownToggle
    									tag="span"
    									data-toggle="dropdown"
    									aria-expanded={ this.state.dropdownOpen }
    								>
    									<div className="nav-user-icon"></div>
    								</DropdownToggle>
    								<div className="menuarea">
                                    { this.state.dropdownOpen ? <div className="carddrop-withoutborder"></div> : ''}
    									<DropdownMenu className="user-preferences">
                                        <DropdownItem >User Settings</DropdownItem>
                                        <DropdownItem >Help</DropdownItem>
                                        <DropdownItem >About</DropdownItem>
                                        <DropdownItem >Change Password</DropdownItem>
                                        <DropdownItem onClick={()=>this.logOut()} >Logout</DropdownItem>
    									</DropdownMenu>
    								</div>
    							</Dropdown>
                                
                                </li>
                                    <ReactTooltip type='dark' place="bottom" effect="float"/>
                                <li className="user-name-role" data-tip={"Logged in as "+ signInData.UserName + "("+signInData.Role +")"}>
                                    <p className="user-profile-user-name">{signInData.UserName}</p>
                                    <p>{signInData.Role}</p>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className="said-nav-container">
                         <div className="said-nav-list" onClick={(e)=>this.gotoModule(e,'dashboard')}>
                             <a className="dashboard-icon"></a>
                             <p>DashBoard</p>
                        </div> 
                         <div className="said-nav-list" onClick={(e)=>this.gotoModule(e,'projects')}>
                             <a className="projects-icon"></a>
                             <p>Project</p>
                        </div> 
                         <div className="said-nav-list" onClick={(e)=>this.gotoModule(e,'settings')}>
                             <a className="settings-icon"></a>
                             <p>Settings</p>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        signInData: state.signInData,
    }
}

export default connect(mapStateToProps, null)(NavBar);