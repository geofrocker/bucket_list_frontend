import React, {Component} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class CreateBucket extends Component{
    /**
     * This component is used to create buckets.
     * It handles the following methods:
     * handleNameChange --> used to set the name of the bucket in the state
     *  handleDescriptionChange --> used to set the description state in the constructor
     *  handleCategoryChange ---> Used to set the category of the state
     *  handleSubmit --> Used to post data in the end point
     *  render --> Used to return jsx
     */

    constructor(props){
        super(props);
        this.state = {bucket_name:'', description:'', category:'', token: '',isAuthorized:false, login_redirect:false};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/callback',
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(()=>{
                this.setState({isAuthorized:true});
        })
            .catch(() =>{
                this.setState({login_redirect:true});
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
            url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/',
            method: 'POST',
            datatype: "json",
            data: data,
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
            
        })
            .then(()=>{
                this.setState({redirect:true});
        })
            .catch((xhr) =>{
                swal("Error!", xhr.response.data.error, "error");
                window.localStorage.setItem('isLoggedIn', false)
        });
    }

    render(){

        if(this.state.login_redirect){
            return(<Redirect to={'/login/'}/>)
        }

        if (!this.state.isAuthorized){
            return(
                <div>
                    <article className="content item-editor-page">

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

                    <form method="post" id="create_bucket_form" onSubmit={this.handleSubmit}>
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