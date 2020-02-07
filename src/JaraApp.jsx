import React, { Component } from "react";
import { connect } from 'react-redux';
import { signInUser } from "./services/SignInService";
import SignIn from "./container/Login/SignIn/SignIn";
import SingUp from "./container/Login/SignUp/SignUp";
import NavBar from "./container/NavBar/NavBar";
import DashBoard from "./container/DashBoard/DashBoard";
import HomePage from "./container/HomePage";
import { Switch, Route, Redirect } from 'react-router-dom';

export class JaraApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignIn: true,
            isSignUp: false
        };
        //Binding events
        this.goToSignUpPage = this.goToSignUpPage.bind(this);
        this.goToSignInPage = this.goToSignInPage.bind(this);
        this.goToDashBoard = this.goToDashBoard.bind(this);
    }

    goToSignUpPage() {
        this.setState({ isSignIn: false, isSignUp: true });
    }
    goToSignInPage() {
        this.setState({ isSignIn: true, isSignUp: false });
    }
    goToDashBoard(data) {
       // this.setState({ isSignIn: false, isSignUp: false });
        this.props.signInUser(data);
    }

    render() {
        const loginForm = (
            <div className="home-page-container" >
                <h4 className={this.state.isSignIn ? "heading" : "heading float-right"}> JARA </h4>
                {this.state.isSignIn ?
                    <SignIn goToSignUpPage={this.goToSignUpPage}
                        goToDashBoard={this.goToDashBoard}></SignIn>
                    : ""
                }
                {this.state.isSignUp ?
                    <SingUp goToSignInPage={this.goToSignInPage}></SingUp>
                    : ""
                }
            </div>
        );
        console.log("this.props.signInData", this.props.signInData);
        return (
            <div>
                {this.props.signInData.isLogin
                    ? 
                    // <div> <HomePage signInUserData = {this.props.signInData}></HomePage></div>
                    // <Route render={({match})=>(
                    //     (<Redirect to='/homePage' />))}></Route> 
                    <Redirect to='/homePage' />
                    : loginForm
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signInData: state.signInData
    };
};

/**
 * mapDispatchToProps - receives the dispatch() method and returns callback back props to use in component
 */
const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: () => dispatch(signInUser())
    };
};

/**
* connect() method connects component to redux store
*/
export default connect(mapStateToProps, mapDispatchToProps)(JaraApp);