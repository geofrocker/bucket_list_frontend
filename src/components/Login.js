import React, {Component} from 'react';
import {Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Login extends Component{
    /**
     * This component is used to Login a user.
     * It handles the following methods:
     *  handleEmailChange() --> Used to set the state that is being changed in the value of the input to the state
     *  handlePasswordChange() --> Used to set the state of the password that is being changed
     *  handleSubmit() --> Used to submit data to the specified endpoint
     *  render --> Used to return jsx
     */

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', redirect: false, token: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(event){
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        axios({
            url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/auth/login',
            data: {email: this.state.email, password: this.state.password},
            datatype: "json",
            method: "post",
        })
            .then((response)=>{
                console.log(JSON.stringify(response));
                window.localStorage.setItem('token', response.data.token);
                window.localStorage.setItem("isLoggedIn", true);
                this.setState({redirect:true});
        })
            .catch((xhr) =>{
                swal("Error!", xhr.response.data.error, 'error');

            });
    }

    render(){
        if (this.state.redirect === true){
            return <Redirect to="/bucketlists/create"/>
        }
        return(
            <div className="auth">
                <div className="auth-container">
                    <div className="card">
                        <header className="auth-header">
                            <h1 className="auth-title">
                                BUCKET-LIST
                            </h1>
                        </header>
                        <div className="auth-content">
                            <p className="text-xs-center">LOGIN TO CONTINUE</p>
                            <form id="login-form" method="POST" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="text" className="form-control underlined"  value={this.state.email} onChange={this.handleEmailChange} name="email" id="email" placeholder="Your Email address" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control underlined" value={this.state.password} onChange={this.handlePasswordChange} name="password" id="password" placeholder="Your Password" />
                                </div>

                                <div className="form-group">
                                    <button type="submit" id="login-user" className="btn btn-block btn-primary">Login</button>
                                </div>
                                <div className="form-group">
                                    <p className="text-muted text-xs-center">Do not have an account? <Link to="/register">Register</Link>
                                    </p>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;