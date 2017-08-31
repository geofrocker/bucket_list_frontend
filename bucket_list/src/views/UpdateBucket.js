import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

class UpdateBucket extends Component{

    constructor(props){
        super(props);
        let bucket_id = this.props.match.params.bucket_id;
        this.state = {bucket_name: '', description: '', category: '', bucket_id:bucket_id, isAuthorized:false};
        this.handleUpdateName = this.handleUpdateName.bind(this);
        this.handleUpdateDescription = this.handleUpdateDescription.bind(this);
        this.handleUpdateCategory = this.handleUpdateCategory.bind(this);
    }

    handleUpdateName(event){
        this.setState = {bucket_name: event.target.value}
    }

    handleUpdateDescription(event){
        this.setState = {description: event.target.value}

    }

    handleUpdateCategory(event){
        this.setState = {category: event.target.value}
    }

    handleUpdate(){
        let data = {
            bucket_name:this.state.bucket_name,
            description:this.state.description,
            category:this.state.category
        };

        axios({
            // url: 'http://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/' + this.state.bucket_id,
            url: 'http://http://127.0.0.1:5000/api/v1/bucketlists/update/' + this.state.bucket_id,
            method: "PUT",
            data: data,
            datatype: "json"
        })
            .then((response)=>{
                this.setState({redirect:true});
            })
            .catch((xhr) =>{
                alert(xhr.response.data.error);

            });
    }


    render(){
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

                    <form name="item" method="post">
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