import React, {Component} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';

class UpdateActivity extends Component{
    /**
     * This component is used to create activities and items.
     * It handles the following methods:
     *  handleDescriptionChange --> used to set the description state in the constructor
     *  handleUpdateData --> Used to post data in the end point
     *  render --> Used to return jsx
     */

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
            url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/callback',
            method:"GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            this.setState({isAuthorized: true});
            window.localStorage.setItem('isLoggedIn', true)
        }).catch(()=>{
            this.setState({isAuthorized: false, login_redirect:true});
        });

        let url = "https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/" + this.state.bucket_id + "/items/" + this.state.item_id;

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
                if (xhr.response.status === 404){
                    this.setState({redirect:true})
                }

            });
    }

    handleUpdateData(event){
        event.preventDefault();
        let bucket_id = this.state.bucket_id;
        let item_id = this.state.item_id;
        let url = "https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/" + bucket_id + "/items/" + item_id;
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

        if (this.state.redirect){
            return <Redirect to={"/bucketlists/" + this.state.bucket_id + "/items/view/"}/>
        }

        if (!this.state.isAuthorized){
            return(
                <div>
                    <article className="content item-editor-page">

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

                    <form method="post" id="update_activity_form" onSubmit={this.handleUpdateData}>
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