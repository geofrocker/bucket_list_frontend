import React from 'react';

class Header extends React.Component{
    render(){
        return (
            <header className="header">
                <div className="header-block header-block-collapse hidden-lg-up">
                    <button type="button" className="collapse-btn" id="sidebar-collapse-btn">
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
            </header>
        )
    }
}

export default Header;