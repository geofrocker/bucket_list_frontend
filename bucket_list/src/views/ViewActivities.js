import React, {Component} from 'react';


class ViewActivities extends Component{

    constructor(props){
        super(props);
        this.state = {description: '', date_created: '', updated: '', isAuthenticated:false}
    }

    render(){
        return(
            <article className="content responsive-tables-page">
                <div className="title-block">
                    <h1 className="title">Activities</h1>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-block">
                                    <div className="card-title-block">
                                        <button type="button" className="btn btn-primary-outline">Add New</button>
                                    </div>

                                </div>
                                <section className="example">
                                    <div className="table-flip-scroll">
                                        <table className="table table-striped table-bordered table-hover flip-content">
                                            <thead className="flip-header">
                                            <tr>
                                                <th>Description</th>
                                                <th>Date Created</th>
                                                <th>Update</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td id="description "></td>
                                                <td className="center" ><button type="button" className="btn btn-success-outline btn-sm">Update</button></td>
                                                <td className="center"><button type="button" className="btn btn-danger-outline btn-sm">Delete</button></td>

                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        )
    }
}