import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios'

class CreateBucket extends Component{
    constructor(props){
        super(props);
        this.state = {bucket_name:'', description:'', category:'', isAuthorized:false};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount(){
    //     axios({
    //         url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/',
    //         method: "GET"
    //     }).then(({data}) =>{
    //         console.log(data);
    //         this.setState({array: data})
    //     })
    //
    // }

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
        let data = {
            bucket_name:this.state.bucket_name,
            description: this.state.description,
            category: this.state.category
        };
        
        axios({
            url: 'http://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/',
            method: 'POST',
            datatype: "json",
            data: data,
            
        }).then(function (response) {
            alert(response.response.data)
        }). catch(function (xhr) {
            if ("response" in xhr){
                alert(xhr.response.data.error);
            }
        })
    }

    render(){
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

                    <form name="item" method="post" onsubmit={this.handleSubmit}>
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
                                <button type="submit" className="btn btn-primary">
                                    Add & New
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