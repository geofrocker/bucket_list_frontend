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
                    <a href="https://github.com/ridgekimani/bucket_list_frontend" className="btn btn-sm header-btn">
                        <i className="fa fa-github-alt"></i>
                        <span> View on GitHub</span>
                    </a>
                </div>

            </header>
        )
    }
}

export default Header;