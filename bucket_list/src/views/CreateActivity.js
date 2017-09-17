import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert';

class CreateActivity extends Component{
    constructor(props){
        super(props);
        let bucket_id = this.props.match.params.bucket_id;
        this.state = {description:'', token: '',isAuthorized:false, bucket_id:bucket_id};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            url: 'http://127.0.0.1:5000/api/v1/bucketlists/' + this.state.bucket_id,
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
                console.log(JSON.stringify(xhr))
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
            url: 'http://127.0.0.1:5000/api/v1/bucketlists/'+ this.state.bucket_id + '/items',
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
                swal("Error!", xhr.response.data.error, "error");
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

                        <form method="post" onSubmit={this.handleSubmit}>
                            <div className="card card-block">
                                <div className="form-group row">
                                    <label className="col-sm-2 form-control-label text-xs-right">
                                        Name:
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