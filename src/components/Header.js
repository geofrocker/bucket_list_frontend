import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class Header extends React.Component{

    constructor(props){
        super(props);
        let token = window.localStorage.getItem('token');
        let isLoggedIn=  window.localStorage.getItem('isLoggedIn');
        this.state = {token:token, isLoggedIn:isLoggedIn, q:'', data:[], search:false};
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchData = this.handleSearchData.bind(this);
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
            console.log(JSON.stringify(response));
            this.setState({isLoggedIn:false, redirect:true});
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('isLoggedIn')

        })
    }

    handleSearchData(event){
        this.setState({q: event.target.value});
    }

    handleSearch(event){
        event.preventDefault()
        this.setState({search:true})
    }

    render(){
        if (this.state.redirect){
            return(
                <Redirect to={'/login/'}/>
            )
        }
        if (this.state.search){
            return(
                <Redirect to={"/search?q=" + this.state.q}/>
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
                        <span> View on GitHub</span>
                    </a>
                </div>


                <div className="header-block header-block-buttons">
                    <label>Search .</label>
                    <input type="text" name="q" value={this.state.q} onChange={this.handleSearchData}/>
                    <button className="btn btn-sm header-btn" type="button" onClick={this.handleSearch}>
                        <span> Search</span>
                    </button>
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