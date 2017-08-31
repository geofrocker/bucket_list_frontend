import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

class ViewBucket extends Component{
    constructor(props){
        super(props);
        console.log(this.props.match.params.bucket_id);
        this.state = {
            bucket_name: '',
            description: '',
            created: '',
            isAuthorized: false,
            data:[],
            bucket_id: this.props.match.params.bucket_id

        };
    }

    componentDidMount() {
        axios({
            // url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/',
            url: 'http://127.0.0.1:5000/api/v1/bucketlists/' + this.state.bucket_id,
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((response)=>{
                this.setState(
                    {
                        bucket_name:response.data.bucket.bucket_name,
                        description: response.data.bucket.description,
                        created: response.data.bucket.created,
                        isAuthorized: true
                    });
                console.log(this.state.isAuthorized);

            })
    }
    render(){
        // if (this.state.isAuthorized === false){
        //     return(
        //         <div>
        //             <article className="content item-editor-page">
        //                 <div className="card card-block">
        //                     <p>Unauthorized! Please log in</p>
        //                 </div>
        //             </article>
        //         </div>
        //     )
        // }
        return(
            <div>
                <Header/>
                <Sidebar/>
                <article className="content responsive-tables-page">
                    <div className="title-block">
                        <h1 className="title"> View Bucket </h1>
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
                                                        <th>Date Created</th>
                                                        <th>Activities</th>
                                                        <th>Activities</th>
                                                        <th>Update</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                            <tr>
                                                                <td>{this.state.bucket_name}</td>
                                                                <td>{this.state.description}</td>
                                                                <td>{this.state.created}</td>
                                                                <td className="center"><button type="button"  className="btn btn-success-outline btn-sm">Add</button></td>
                                                                <td className="center" ><button type="button" className="btn btn-success-outline btn-sm">View</button> </td>
                                                                <td className="center" ><button type="button" className="btn btn-success-outline btn-sm">Update</button></td>
                                                                <td className="center"><button type="button"  className="btn btn-danger-outline btn-sm">Delete</button></td>
                                                            </tr>
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
export default ViewBucket;