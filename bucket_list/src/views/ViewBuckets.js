import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

class ViewBuckets extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Sidebar/>
                <article className="content responsive-tables-page">
                    <div className="title-block">
                        <h1 className="title"> View Buckets </h1>
                    </div>

                    <section className="section">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block">
                                        <div className="card-title-block">
                                            <h3 className="title"> Your Buckets </h3>
                                        </div>
                                        <section className="example">
                                            <div className="table-flip-scroll">
                                                <table className="table table-striped table-bordered table-hover flip-content">
                                                    <thead className="flip-header">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Category</th>
                                                        <th>Date Created</th>
                                                        <th>Activities</th>
                                                        <th>Activities</th>
                                                        <th>Update</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
}
export default ViewBuckets