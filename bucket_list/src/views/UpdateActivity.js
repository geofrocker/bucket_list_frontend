import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

class UpdateActivity extends Component{
    constructor(props){
        super(props);
        this.state = {description: '', bucket_id: '', item_id:''};
        this.handleUpdateDescription = this.handleUpdateDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUpdateDescription(event){
        this.setState = {description:event.target.description}
    }

    handleSubmit(){
        let bucket_id = this.state.bucket_id;
        let item_id = this.state.item_id;
        let url = 'http://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/' + bucket_id + '/items/' + item_id;
        axios({
            url: url,
            data: {description: this.state.description},
            datatype: 'json',
            method: "Update"
        })
            .then((response)=>{
                this.setState({redirect:true});
            })
            .catch((xhr) =>{
                alert(xhr.response.data.error);

            });

    }
    render(){
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
export default UpdateActivity;