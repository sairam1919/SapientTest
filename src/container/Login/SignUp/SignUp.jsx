import React , { Component } from "react";
import './SignUp.css';
import { alphaNumericValidation, emailValidation } from "../../../utils/InputValidation";
import axios from 'axios';

const roles = ['Admin','User'];

export class SingUp extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            userName:'',
            password:'',
            confirmPassword:'',
            mobileNum:'',
            userRole:'',
            isError:false,
            emailValidationError:false,
            response: "",
            showError: false,
            showSuccess: false,
        };
    }
    goToSignInPage(){
        this.props.goToSignInPage();
    }
    onChangeInputBox(e,id){
        if(id === 'email'){
            this.setState({email:e.target.value});
            // const val = emailValidation(this.state.email);
            // this.setState({emailValidationError:val}) ;
        }else if(id === 'userName'){
            this.setState({userName:e.target.value});
        }else if(id === 'password'){
            this.setState({password:e.target.value});
        }else if(id === 'confirmPassword'){
            this.setState({confirmPassword:e.target.value});
        }else if(id === 'mobileNum'){
            this.setState({mobileNum:e.target.value});
        }else if(id === 'userRole'){
            this.setState({userRole:e.target.value});
        }

    }

    signUp(){
        const { userName, email, password, mobileNum, userRole} = this.state;
        let body = { "UserName": userName, "Email": email, "Password": password, "MobileNumber": mobileNum, "Role": userRole};
        console.log("Body" + body);
        axios.post('http://localhost:8080/api/user',body)
        .then(res => {
            if(res.data) {
            let body = {
                username:userName,
                password:password,
                email:email
              }
              this.sendEmail(body) 
              this.setState({ response: "Registerd Successfully. Go and Try Logging in"});
              this.setState({showError: false});
              this.setState({showSuccess: true});
            } else {
                this.setState({ response: "Unabel to Register the User. Please Try Again."});
                this.setState({showError: true});
              }
    
        })
    }

    sendEmail = (body) => {
        axios.post('http://localhost:8080/api/UserCreationEmail', body)
        .then(res => {
            if(res.data) {
                console.log("Mail Sent Successfuly");
            }else {
                console.log("Error While Sending a mail to the user");
            }
        });
    }

    render(){
        return(
            <div >
                <div className="overlay-signup-form-container">
                    <div className="overlay-signup-form">
                        <div className="overlay-signup-form-panel">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="form-btn signin-right-btn" onClick={()=>this.goToSignInPage()}>Sign In</button>
                        </div>
                    </div>
                </div> 
                <div className="signup-form-container">
                        {this.state.showError ? this.state.response: "" }
                        {this.state.showSuccess ? this.state.response: "" }
                        <h1>Create Account</h1>
                        <input type="email" className="input-box" placeholder="Email" value={this.state.email} onChange={(e)=>this.onChangeInputBox(e,'email')} />
                        {this.state.emailValidationError ? "Please enter valied email": "" }
                        <input type="username" className="input-box" placeholder="User Name" value={this.state.userName} onChange={(e)=>this.onChangeInputBox(e,'userName')} />
                        <input type="password" className="input-box" placeholder="Password" value={this.state.password} onChange={(e)=>this.onChangeInputBox(e,'password')}/>
                        <input type="password" className="input-box" placeholder="Re Enter Password" value={this.state.confirmPassword} onChange={(e)=>this.onChangeInputBox(e,'confirmPassword')} />
                        <input type="text" className="input-box" placeholder="Mobile Number" value={this.state.mobileNum} onChange={(e)=>this.onChangeInputBox(e,'mobileNum')} />
                        <select className="drop-dow">
                            <option value="">Select User Role</option>
                            {
                                roles.map(function(val,i){
                                    return <option key={i} value={val}>{val}</option>
                                })
                            }
                        </select>
                        <button className="signup-btn form-btn" onClick={()=>this.signUp()} >Sign Up</button>
                </div>
            </div>
        )
    }
}

export default SingUp;