import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';


class ViewBuckets extends Component{

    constructor(props){
        super(props);
        this.state = {isAuthorized: false, data:[], login_redirect:false};
    }

    componentDidMount() {
        axios({
            url: 'http://127.0.0.1:5000/api/v1/bucketlists/',
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((response)=>{
                this.setState({data:response.data.buckets, isAuthorized: true});
            })

            .catch((xhr) =>{
                this.setState({login_redirect:true})

            });
    }

    render(){
        if(this.state.login_redirect){
            return(
                <Redirect to={'/login/'}/>
            )
        }

        else if (!this.state.isAuthorized){
            return(
                <div>
                    <article className="content item-editor-page">

                    </article>
                </div>
            )
        }
        if(this.state.login_redirect){
            return(
                <Redirect to={'/login/'}/>
            )
        }

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
                                                <table id="buckets_table" className="table table-striped table-bordered table-hover flip-content">
                                                    <thead className="flip-header">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Date Created</th>
                                                        <th>Activities</th>
                                                        <th>Activities</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>{this.state.data.map(function(item, key){
                                                        return (
                                                            <tr key={key}>
                                                                <Link to={'/bucketlists/update/' + item.id}><td>{item.bucket_name}</td></Link>
                                                                <td>{item.description}</td>
                                                                <td>{item.created}</td>
                                                                <td className="center">
                                                                    <button type="button" className="btn btn-success-outline btn-sm">
                                                                        <Link to={'/bucketlists/' + item.id + '/items/create/'}><td>Add</td></Link>
                                                                    </button>
                                                                </td>
                                                                <td className="center" >
                                                                    <button type="button" className="btn btn-success-outline btn-sm">
                                                                        <Link to={'/bucketlists/' + item.id + '/items/view/'}><td>View</td></Link>
                                                                    </button>
                                                                </td>
                                                                <td className="center" >
                                                                    <button type="button" className="btn btn-danger-outline btn-sm">
                                                                        <Link to={'/bucketlists/delete/' + item.id}><td>Delete</td></Link>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
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

export default ViewBuckets;
