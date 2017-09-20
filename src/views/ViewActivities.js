import React, {Component} from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import  {Redirect, Link} from 'react-router-dom'


class ViewActivities extends Component{

    constructor(props){
        super(props);
        let bucket_id = this.props.match.params.bucket_id;
        this.state = {description: '', date_created: '', updated: '', isAuthenticated:false, data:[], bucket_id:bucket_id};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        return (
            <Redirect to = {'/bucketlists/' + this.state.bucket_id + '/items/create/'} />
        )}
    
    componentDidMount() {
        axios({
            url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/' + this.state.bucket_id + '/items',
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((response)=>{
                this.setState({data:response.data.activities, isAuthorized: true});
                console.log(JSON.stringify(response))

            })
            .catch((xhr) =>{
                console.log(JSON.stringify(xhr))
            });
    }

    render(){
        if (!this.state.isAuthorized){
            return(
                <div>
                    <article className="content item-editor-page">
                        <div className="card card-block">
                            <p>Unauthorized! Please <Link to={'/login/'}>Login</Link></p>
                        </div>
                    </article>
                </div>
            )
        }
        return(
            <div>
                <Header/>
                <Sidebar/>
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
                                            <button type="button" className="btn btn-primary-outline">
                                                <Link to={"/bucketlists/" + this.state.bucket_id + "/items/create/"}>Add New</Link>
                                            </button>
                                        </div>

                                    </div>
                                    <section className="example">
                                        <div className="table-flip-scroll">
                                            <table id="activities_table" className="table table-striped table-bordered table-hover flip-content">
                                                <thead className="flip-header">
                                                <tr>
                                                    <th>Description</th>
                                                    <th>Date Created</th>
                                                    <th>Update</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.data.map(function(item, key){
                                                    return (
                                                        <tr key={key}>
                                                            <td>{item.description}</td>
                                                            <td>{item.created}</td>
                                                            <td className="center" >
                                                                <Link to={'/bucketlists/' + item.bucket_id + '/items/update/' + item.activity_id}><td>Update</td></Link>
                                                            </td>
                                                            <td className="center" >
                                                                <button type="button" className="btn btn-danger-outline btn-sm">
                                                                    <Link to={'/bucketlists/' + item.bucket_id + '/items/delete/' + item.activity_id}><td>Delete</td></Link>
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
                    </section>
                </article>
            </div>
        )
    }
}
export default ViewActivities