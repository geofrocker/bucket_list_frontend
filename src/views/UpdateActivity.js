import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import swal from 'sweetalert';

class UpdateActivity extends Component{
    constructor(props){
        super(props);
        let bucket_id = this.props.match.params.bucket_id;
        let item_id = this.props.match.params.item_id;
        this.state = {description: '', bucket_id: bucket_id, item_id:item_id};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleUpdateData = this.handleUpdateData.bind(this);
    }

    handleDescriptionChange(event){
        this.setState({description: event.target.value})
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

        let url = "http://127.0.0.1:5000/api/v1/bucketlists/" + this.state.bucket_id + "/items/" + this.state.item_id;

        axios({

            url: url,
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((response)=>{
                let description = response.data.activity.description;
                this.setState ({description:description})
            })
            .catch((xhr) =>{
                swal("Error!", xhr.response.data.error, "error");
                if (xhr.response.status == 404){
                    this.setState({redirect:true})
                }

            });
    }

    handleUpdateData(event){
        event.preventDefault();
        let bucket_id = this.state.bucket_id;
        let item_id = this.state.item_id;
        let url = "http://127.0.0.1:5000/api/v1/bucketlists/" + this.state.bucket_id + "/items/" + this.state.item_id;
        let data = {description: this.state.description};
        axios({
            url: url,
            method: 'PUT',
            data: data,
            datatype: 'json',
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response)=>{
                this.setState({redirect:true});
            })
            .catch((xhr) =>{
                swal("Error!", xhr.response.data.error, "error");


            });

    }

    render(){
        if (this.state.redirect){
            return <Redirect to={"/bucketlists/" + this.state.bucket_id + "/items/view/"}/>
        }

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
                <article className="content item-editor-page">
                    <div className="title-block">
                        <h3 className="title"> Update Activity
                            <span className="sparkline bar"></span>
                        </h3>
                    </div>

                    <form method="post" onSubmit={this.handleUpdateData}>
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
export default UpdateActivity;