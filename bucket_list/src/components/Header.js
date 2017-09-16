import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class Header extends React.Component{

    constructor(props){
        super(props);
        let token = window.localStorage.getItem('token');
        let isLoggedIn=  window.localStorage.getItem('isLoggedIn');
        this.state = {token:token, isLoggedIn:isLoggedIn};
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event){
        event.preventDefault();
        axios({
            url: "http://127.0.0.1:5000/api/v1/auth/logout",
            method: "POST",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            datatype: "json"

        }).then((response) => {
            console.log(JSON.stringify(response))
            this.setState({isLoggedIn:false, redirect:true});
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('isLoggedIn')

        })
    }


    render(){
        if (this.state.redirect){
            return(
                <Redirect to={'/login/'}/>
            )
        }
        return (
            <header className="header">
                <div className="header-block header-block-collapse hidden-lg-up">
                    <button className="collapse-btn" id="sidebar-collapse-btn">
                        <i className="fa fa-bars"></i>
                    </button>
                </div>

                <div className="header-block header-block-buttons">
                    <a href="https://github.com/ridgekimani/bucket_list_frontend" className="btn btn-sm header-btn">
                        <i className="fa fa-github-alt"></i>
                        <span> View on GitHub</span>
                    </a>
                </div>
                <div className="header-block header-block-buttons">
                    <button className="btn btn-sm header-btn" type="button" onClick={this.handleLogout}>
                        <i className="fa fa-power-off "></i>
                        <span> Logout</span>
                    </button>
                </div>
            </header>
        )
    }
}

export default Header;