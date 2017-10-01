import React, {Component} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert';

class CreateActivity extends Component{
    /**
     * This component is used to create activities or items.
     * It handles the following methods:
     *  handleDescriptionChange --> used to set the description state in the constructor
     *  handleSubmit --> Used to post data in the end point
     *  render --> Used to return jsx
     */

    constructor(props){
        super(props);
        let bucket_id = this.props.match.params.bucket_id;
        this.state = {description:'', token: '',isAuthorized:false, bucket_id:bucket_id, redirect: false, login_redirect:false};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/' + this.state.bucket_id,
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
                this.setState({redirect:true})
            });
    }

    handleDescriptionChange(event){
        this.setState({description: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        let data = {
            description: this.state.description,
        };

        axios({
            url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/'+ this.state.bucket_id + '/items',
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

         if (this.state.redirect){
                    return <Redirect to={'/bucketlists/'+ this.state.bucket_id + '/items/view/'}/>

         }

         return(
                <div>
                    <Header/>
                    <Sidebar/>
                    <article className="content item-editor-page">
                        <div className="title-block">
                            <h3 className="title"> Add new Activity
                                <span className="sparkline bar"></span>
                            </h3>
                        </div>

                        <form method="post" id="create_activity_form" onSubmit={this.handleSubmit}>
                            <div className="card card-block">
                                <div className="form-group row">
                                    <label className="col-sm-2 form-control-label text-xs-right">
                                        Description:
                                    </label>

                                    <div className="col-sm-10">
                                        <input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange} className="form-control boxed" placeholder="" />
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


export default CreateActivity;