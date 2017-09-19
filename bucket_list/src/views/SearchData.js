import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {parse}  from 'querystring'
import swal from 'sweetalert'

class SearchData extends Component {

    constructor(props) {
        super(props);
        let query = this.props.location.search;
        for (var value in parse(query)){
            this.state = {q:parse(query)[value]}
        }
        if (!this.state.q){
            swal("Error!", "Please enter the search data", "error");
            <Redirect to={"bucketlists/view"}></Redirect>

        }
    }

    componentDidMount() {


        axios({
            url: 'http://127.0.0.1:5000/api/v1/search?q=' +this.state.q,
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({activities: response.data.activities, buckets:response.data.buckets, isAuthorized: true});

            })
            .catch((xhr) => {
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
                        <h1 className="title"> Search results</h1>
                    </div>

                    <section className="section">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block">
                                        <div className="card-title-block">
                                        </div>
                                        <section className="example">
                                            <div className="table-flip-scroll">
                                                <table className="table table-striped table-bordered table-hover flip-content">
                                                    <thead className="flip-header">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Date Created</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>{this.state.buckets.map(function(item, key){
                                                        return (
                                                            <tr key={key}>
                                                                <Link to={'/bucketlists/update/' + item.id}><td>{item.bucket_name}</td></Link>
                                                                <td>{item.description}</td>
                                                                <td>{item.created}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                    <tbody>
                                                    {this.state.activities.map(function(item, key){
                                                        return (
                                                            <tr key={key}>
                                                                <Link to={'/bucketlists/' + item.bucket_id + '/items/update/' + item.activity_id}><td>{item.description}</td></Link>
                                                                <td>{item.description}</td>
                                                                <td>{item.created}</td>
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

export default SearchData;