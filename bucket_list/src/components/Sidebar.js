import React from 'react';

class Sidebar extends React.Component{
    render(){
        return (
            <aside className="sidebar">
                <div className="sidebar-container">
                    <div className="sidebar-header">
                        <div className="brand">
                            BUCKET-LIST
                        </div>
                    </div>

                    <nav className="menu">
                        <ul className="nav metismenu" id="sidebar-menu">
                            <li className="">
                                <a href="#">
                                    <i className="fa fa-home"></i>
                                     Add Bucket
                                </a>
                            </li>

                            <li className="">
                                <a href="#">
                                    <i className="fa fa-bitbucket"></i>
                                     View Buckets
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        )
    }
}

export default Sidebar;