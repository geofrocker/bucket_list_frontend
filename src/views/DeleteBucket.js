import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class DeleteBucket extends Component {

    constructor(props) {
        super(props);
        let bucket_id = this.props.match.params.bucket_id;
        this.state = {bucket_id: bucket_id, isAuthorized: false, redirect:false};
        this.confirmDelete = this.confirmDelete.bind(this);
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
            .then((response) => {
                let bucket_id = response.data.bucket.id;
                this.setState({bucket_id: bucket_id});
                this.confirmDelete()
            })
            .catch((xhr) => {
                swal("Error", xhr.response.data.error, "error");
                if (xhr.response.status == 404) {
                    this.setState({redirect: true})
                }

            });
    }

    confirmDelete(){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            buttons: true,
            closeOnClickOutside: false,
            dangerMode: true,
        })
            .then((willDelete) =>{
                if (!willDelete){
                    swal("Info!", "Delete cancelled", "info");
                    this.setState({redirect:true})

                }
                else{
                    axios({
                        url: 'https://ridge-bucket-list-api.herokuapp.com/api/v1/bucketlists/' + this.state.bucket_id,
                        method: "DELETE",
                        headers: {
                            'token': window.localStorage.getItem('token'),
                            'Content-Type': 'application/json'
                        }
                    }).then((response)=>{
                        swal("Success!", "Bucket deleted successfully", "success");
                        this.setState({redirect:true})
                    })
                }

            })

                .catch((xhr) => {
                    swal("Error", xhr.response.data.error, "error");
                    if (xhr.response.status == 404) {
                        this.setState({redirect: true})
                    }
                })
    }

    render(){
        if (this.state.redirect){
            return(
                <Redirect to={"/bucketlists/view/"}/>
            )
        }

        return(
            <div>
                <Header/>
                <Sidebar/>
            </div>
        )
    }
}

export default DeleteBucket;