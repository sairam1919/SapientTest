
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import { fetchDataAPI } from '../services/HomeService';
import { HomeConstants } from '../utils/Constants';
import SignIn from './Login/SignIn/SignIn';
import SingUp from './Login/SignUp/SignUp';
import { NavBar } from './NavBar/NavBar';
import { DashBoard } from './DashBoard/DashBoard';
import { timingSafeEqual } from 'crypto';
import { JaraApp } from '../JaraApp';
import { Switch, Route, Redirect } from 'react-router-dom';
import { userLogOut } from '../store/actions/SignInActions';
import Project from '../component/Project/Project';
import { saveProject, fetchProjects } from '../store/actions/ProjectAction';



class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSignIn: true,
            currentPage: 'dashboard',
            showModal: false,
        };
        //Binding events
        this.gotoModule = this.gotoModule.bind(this);
        this.setModule = this.setModule.bind(this);
        this.logOut = this.logOut.bind(this);
        this.toggleProjectModel = this.toggleProjectModel.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }

    toggleProjectModel(){
        this.setState({ showModal: !this.state.showModal })
    }
    setModule(val) {
        console.log("currentPage", val);
        this.setState({ currentPage: val });
    }
    logOut(user) {
        this.props.userLogOut(user);
    }
    gotoModule() {
        const module = this.state.currentPage;
        let renderComponent = null;
        console.log("Module", module);
        switch (module) {
            case 'dashboard':
                renderComponent = <DashBoard></DashBoard>;
                break;
            case 'settings':
                renderComponent = ""
                break;
                case 'projects':
                renderComponent = <Project></Project>;
                break;
            default:
                renderComponent = <DashBoard></DashBoard>;
                break;
        }
        return renderComponent;
    }
    saveProject(project){
        this.props.saveProject(project);
    }
    render() {
        const { signInData,projectData } = this.props;
        return (
            <div>
                {this.state.showModal ? 
                <Project 
                toggleProjectModel={this.toggleProjectModel}
                saveProject = {this.saveProject}
                showModal = {this.state.showModal}
                /> 
                : null }
                {signInData.isLogin
                    ?
                    <div>
                        <NavBar 
                            setModule={this.setModule}
                            signInData={signInData}
                            logOut={this.logOut}
                            toggleProjectModel={this.toggleProjectModel}
                            fetchProjects={this.fetchProjects}
                            projectData={projectData}
                            />
                        <div style={{ marginLeft: 120 }}> {this.gotoModule()}</div> </div> :
                    <Redirect to='/' />
                }

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        signInData: state.signInData,
        projectData:state.projectData
    };
};

/**
 * mapDispatchToProps - receives the dispatch() method and returns callback back props to use in component
 */
const mapDispatchToProps = dispatch => {
    return {
        userLogOut: (user) => dispatch(userLogOut(user)),
        saveProject:(project) => dispatch(saveProject(project)),
        fetchProjects:()=> dispatch(fetchProjects())
    };
};

/**
* connect() method connects component to redux store
*/
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(HomePage);