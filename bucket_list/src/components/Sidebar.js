import React from 'react';
import {Link} from 'react-router-dom';

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
                                <Link to="/bucketlists/create/">
                                    <i className="fa fa-home"></i>
                                    Add Bucket
                                </Link>
                            </li>

                            <li className="">
                                <Link to="/bucketlists/view/">
                                    <i className="fa fa-bitbucket"></i>
                                     View Buckets
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        )
    }
}

export default Sidebar;