import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class DeleteActivity extends Component {

    constructor(props) {
        super(props);
        let bucket_id = this.props.match.params.bucket_id;
        let item_id = this.props.match.params.item_id;
        this.state = {bucket_id: bucket_id, isAuthorized: false, item_id:item_id, redirect:false};
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    componentDidMount() {
        let url = "http://127.0.0.1:5000/api/v1/bucketlists/" + this.state.bucket_id + "/items/" + this.state.item_id;
        axios({
            url: url,
            method: "GET",
            headers: {
                'token': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
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
        let url = "http://127.0.0.1:5000/api/v1/bucketlists/" + this.state.bucket_id + "/items/" + this.state.item_id;

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
                        url: url,
                        method: "DELETE",
                        headers: {
                            'token': window.localStorage.getItem('token'),
                            'Content-Type': 'application/json'
                        }
                    }).then((response)=>{
                        swal("Success!", "Item deleted successfully", "success");
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

export default DeleteActivity;