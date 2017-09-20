import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="auth-content">
                <p className="text-xs-center">LOGIN TO CONTINUE</p>
                <form id="login-form" method="POST" onSubmit={this.props.handleSubmit}>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="text" className="form-control underlined" onChange={this.props.handleEmailChange} name="email" id="email" placeholder="Your Email address" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control underlined"  onChange={this.props.handlePasswordChange} name="password" id="password" placeholder="Your Password" />
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
        )
    }
}

LoginForm.propTypes = {
    handleEmailChange: PropTypes.func,
    handlePasswordChange: PropTypes.func,
    handleSubmit: PropTypes.func
};

