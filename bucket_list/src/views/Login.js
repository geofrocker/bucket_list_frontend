import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component{
    render(){
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
                            <form id="login-form" method="POST" onsubmit="return false">
                                <div className="form-group">
                                    <label for="email">Email Address</label>
                                    <input type="text" className="form-control underlined" name="email" id="email" placeholder="Your Email address" />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" className="form-control underlined" name="password" id="password" placeholder="Your Password" />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-block btn-primary">Login</button>
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