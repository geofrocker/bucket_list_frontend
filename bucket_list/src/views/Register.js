import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Register extends Component{
    render(){
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
                                <form id="signup" method="POST">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control underlined" name="email" id="email" placeholder="Enter email address" />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control underlined" name="password" id="password" placeholder="Enter password" />
                                    </div>

                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" className="form-control underlined" name="confirm_password" id="confirm_password" placeholder="Enter password" />
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