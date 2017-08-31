import React, {Component} from 'react';
import {render} from 'react-dom';
import CreateBucket from './views/CreateBucket';
import ViewBuckets from './views/ViewBuckets';
import ViewBucket from './views/ViewBucket'
import UpdateBucket from './views/UpdateBucket'
import Register from './views/Register';
import Login from './views/Login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


class Index extends Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/register/" component={Register}/>
                    <Route path="/login/" component={Login}/>
                    <Route path="/bucketlists/create/" component={CreateBucket}/>
                    <Route path="/bucketlists/view/" component={ViewBuckets}/>
                    <Route path="/bucketlists/views/:bucket_id" component={ViewBucket}/>
                    <Route path="/bucketlists/update/:bucket_id" component={UpdateBucket} />
                </Switch>
            </div>
        )
    }
}
render((
    <BrowserRouter><Index/></BrowserRouter>),
        document.getElementById('app')
);