import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class Register extends Component{

    /**
     * This component is used to Register a user.
     * It handles the following methods:
     *  handleEmailChange() --> Used to set the state that is being changed in the value of the input to the state
     *  handlePasswordChange() --> Used to set the state of the password that is being changed
     *  handlePasswordChange1() --> used to change the state of the confirm password
     *  handleSubmit() --> Used to submit data to the specified endpoint
     *  render --> Used to return jsx
     */

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', confirm_password: '', redirect: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordChange1 = this.handlePasswordChange1.bind(this);

    }
    handleEmailChange(event){
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }
    handlePasswordChange1(event) {
        this.setState({confirm_password: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        axios({
            url : 'https://ridge-bucket-list-api.herokuapp.com/api/v1/auth/register',
            data: {email: this.state.email, password: this.state.password, confirm_password:this.state.confirm_password},
            datatype: "json",
            method: "post"
        })
            .then((response)=>{
                swal("Success", response.data.success, "success");
                window.localStorage.setItem('token', response.data.token);
                this.setState({redirect:true});
            })
            .catch((xhr) =>{
                console.log(JSON.stringify(xhr));
                swal("Error!", xhr.response.data.error, 'error');

            });
    }
    render(){
        if (this.state.redirect){
            return <Redirect to="/bucketlists/create"/>
        }

        return (
            <div>
                <div className="auth">
                    <div className="auth-container">
                        <div className="card">
                            <header className="auth-header">
                                <h1 className="auth-title">
                                    BUCKET-LIST
                                </h1>
                            </header>
                            <div className="auth-content">
                                <p className="text-xs-center">REGISTER TO CONTINUE</p>
                                <form id="signup" method="POST" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control underlined" value={this.state.email} onChange={this.handleEmailChange} name="email" id="email" placeholder="Enter email address" />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control underlined" value={this.state.password} onChange={this.handlePasswordChange} name="password" id="password" placeholder="Enter password" />
                                    </div>

                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" className="form-control underlined" value={this.state.password1} onChange={this.handlePasswordChange1} name="confirm_password" id="confirm_password" placeholder="Enter password" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
                                    </div>

                                    <div className="form-group">
                                        <p className="text-muted text-xs-center">Already have an account? <Link to="/login">Login</Link>
                                        </p>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;