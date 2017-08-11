import React from 'react';

class Header extends React.Component{
    render(){
        return (
            <header className="header">
                <div className="header-block header-block-collapse hidden-lg-up">
                    <button className="collapse-btn" id="sidebar-collapse-btn">
                        <i className="fa fa-bars"></i>
                    </button>
                </div>

                <div className="header-block header-block-buttons">
                    <a href="https://github.com/ridgekimani/bucket_list" className="btn btn-sm header-btn">
                        <i className="fa fa-github-alt"></i>
                        <span>View on GitHub</span>
                    </a>
                </div>

                <div className="header-block header-block-nav">
                    <ul className="nav-profile">
                        <li className="profile dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                <div className="img">
                                </div>
                                <span className="name"></span>
                            </a>
                            <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenu1">
                                <a className="dropdown-item" href="#">
                                    <i className="fa fa-power-off icon"></i>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;