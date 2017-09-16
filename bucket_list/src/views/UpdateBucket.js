import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class UpdateBucket extends Component{

    constructor(props){
        super(props);
        let bucket_id = this.props.match.params.bucket_id;
        this.state = {bucket_name: '', description: '', category: '', bucket_id:bucket_id, isAuthorized:false};
        this.handleUpdateName = this.handleUpdateName.bind(this);
        this.handleUpdateDescription = this.handleUpdateDescription.bind(this);
        this.handleUpdateCategory = this.handleUpdateCategory.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdateName(event){
        this.setState({bucket_name: event.target.value})
    }

    handleUpdateDescription(event){
        this.setState({description: event.target.value})

    }

    handleUpdateCategory(event){
        this.setState ({category: event.target.value})
    }

    componentDidMount() {
        axios({
            url: 'http://127.0.0.1:5000/api/v1/callback',
            method:"GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            this.setState({isAuthorized: true});
            window.localStorage.setItem('isLoggedIn', true)
        }).catch((xhr)=>{
            this.setState({isAuthorized: false});
            window.localStorage.setItem('isLoggedIn', false)
        });

        axios({
            url: 'http://127.0.0.1:5000/api/v1/bucketlists/' + this.state.bucket_id,
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((response)=>{
                let bucket_name = response.data.bucket.bucket_name;
                let description = response.data.bucket.description;
                let category = response.data.bucket.category;
                this.setState ({bucket_name: bucket_name, description:description, category:category })
            })
            .catch((xhr) =>{
                console.log(JSON.stringify(xhr));

            });
    }

    handleUpdate(event){
        event.preventDefault();
        let data = {
            bucket_name:this.state.bucket_name,
            description:this.state.description,
            category:this.state.category
        };
        axios({
            url: 'http://127.0.0.1:5000/api/v1/bucketlists/' + this.state.bucket_id,
            method: 'PUT',
            data: data,
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            datatype: "json"
        })
            .then((response)=>{
                this.setState({redirect:true});
            })
            .catch((xhr) =>{
                swal(xhr.response.data.error);

            });
    }

    render(){
        if (this.state.redirect){
            return <Redirect to="/bucketlists/view"/>
        }

        if (!this.state.isAuthorized){
            return(
                <div>
                    <article className="content item-editor-page">
                        <div className="card card-block">
                            <p>Unauthorized! Please log in</p>
                        </div>
                    </article>
                </div>
            )
        }

        return (
            <div>
                <Header/>
                <Sidebar/>
                <article className="content item-editor-page">
                    <div className="title-block">
                        <h3 className="title"> Update item
                            <span className="sparkline bar"></span>
                        </h3>
                    </div>

                    <form method="post" onSubmit={this.handleUpdate}>
                        <div className="card card-block">
                            <div className="form-group row">
                                <label className="col-sm-2 form-control-label text-xs-right">
                                    Name:
                                </label>

                                <div className="col-sm-10">
                                    <input type="text" name="bucket_name" value={this.state.bucket_name} onChange={this.handleUpdateName} className="form-control boxed" placeholder="" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 form-control-label text-xs-right">
                                    Description:
                                </label>

                                <div className="col-sm-10">
                                    <input type="text" name="description" value={this.state.description} onChange={this.handleUpdateDescription} className="form-control boxed" placeholder="" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 form-control-label text-xs-right">
                                    Category:
                                </label>
                                <div className="col-sm-10">
                                    <input type="text" name="category" value={this.state.category} onChange={this.handleUpdateCategory} className="form-control boxed" placeholder="Eg Travel" />
                                </div>
                            </div>
                            <div className="col-sm-10 col-sm-offset-2">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>

                        </div>
                    </form>
                </article>
            </div>
        )
    }
}
export default UpdateBucket;