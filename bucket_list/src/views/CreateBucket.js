import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class CreateBucket extends Component{
    constructor(props){
        super(props);
        this.state = {bucket_name:'', description:'', category:'', token: '',isAuthorized:false};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            url: 'http://127.0.0.1:5000/api/v1/callback',
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((response)=>{
                this.setState({isAuthorized:true});
        })
            .catch((xhr) =>{
                alert(xhr);
            });
    }

    handleNameChange(event){
        this.setState({bucket_name: event.target.value})
    }

    handleDescriptionChange(event){
        this.setState({description: event.target.value})
    }

    handleCategoryChange(event){
        this.setState({category: event.target.value})
    }


    handleSubmit(event){
        event.preventDefault();
        let data = {
            bucket_name:this.state.bucket_name,
            description: this.state.description,
            category: this.state.category
        };
        
        axios({
            // url: 'http://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/',
            url: 'http://127.0.0.1:5000/api/v1/bucketlists/',
            method: 'POST',
            datatype: "json",
            data: data,
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
            
        })
            .then((response)=>{
                this.setState({redirect:true});
        })
            .catch((xhr) =>{
                swal(xhr.response.data.error);
                window.localStorage.setItem('isLoggedIn', false)
        });
    }

    render(){
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
        else if (this.state.redirect === true){
            return <Redirect to="/bucketlists/view"/>
        }
        return(
            <div>
                <Header/>
                <Sidebar/>
                <article className="content item-editor-page">
                    <div className="title-block">
                        <h3 className="title"> Add new Bucket
                            <span className="sparkline bar"></span>
                        </h3>
                    </div>

                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="card card-block">
                            <div className="form-group row">
                                <label className="col-sm-2 form-control-label text-xs-right">
                                    Name:
                                </label>

                                <div className="col-sm-10">
                                    <input type="text" name="bucket_name" value={this.state.bucket_name} onChange={this.handleNameChange} className="form-control boxed" placeholder="" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 form-control-label text-xs-right">
                                    Description:
                                </label>

                                <div className="col-sm-10">
                                    <input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange} className="form-control boxed" placeholder="" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 form-control-label text-xs-right">
                                    Category:
                                </label>

                                <div className="col-sm-10">
                                    <input type="text" name="category" value={this.state.category} onChange={this.handleCategoryChange} className="form-control boxed" placeholder="Eg. Travel" />
                                </div>
                            </div>

                            <div className="col-sm-10 col-sm-offset-2">
                                <button type="submit" className="btn btn-primary">
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </article>
            </div>

        )
    }
}
export default CreateBucket;