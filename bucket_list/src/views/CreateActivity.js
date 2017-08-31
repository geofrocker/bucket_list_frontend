import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {Redirect} from 'react-router-dom';
import axios from 'axios'

class CreateActivity extends Component{
    constructor(props){
        super(props);
        this.state = {description:'', token: '',isAuthorized:false};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            // url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/',
            url: 'http://127.0.0.1:5000/api/v1/bucketlists/',
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

    handleDescriptionChange(event){
        this.setState({description: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        let data = {
            description: this.state.description,
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
                console.log(JSON.stringify(xhr));
                alert(xhr.response.data.error);
            });
    }

    render(){
        if (this.state.isAuthorized === false){
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
                        <h3 className="title"> Add new Activity
                            <span className="sparkline bar"></span>
                        </h3>
                    </div>

                    <form name="item" method="post" onSubmit={this.handleSubmit()}>
                        <div className="card card-block">
                            <div className="form-group row">
                                <label className="col-sm-2 form-control-label text-xs-right"
                                       onChange={this.handleUpdateDescription}>Description</label>
                                <div className="col-sm-10">
                                    <div className="wyswyg">
                                        <div className="editor" id="div_description"></div>
                                    </div>
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
export default CreateActivity;