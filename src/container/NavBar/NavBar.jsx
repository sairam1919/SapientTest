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
        if(this.props.setModule){
            this.props.setModule(module);
        }
    }
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
        console.log("signInData", signInData);
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
                                        {items}
    									</DropdownMenu>
    								</div>
    							</Dropdown>
                                    </a>
                                </li>
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
                                <li className="user-name-role" data-tip={"Logged in as "+ signInData.userDetails.data.UserName + "("+signInData.userDetails.data.Role +")"}>
                                    <p className="user-profile-user-name">{signInData.userDetails.data.UserName}</p>
                                    <p>{signInData.userDetails.data.Role}</p>
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
                         <div className="said-nav-list" onClick={(e)=>this.gotoModule(e,'releases')}>
                             <a className="settings-icon"></a>
                             <p>Releases</p>
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