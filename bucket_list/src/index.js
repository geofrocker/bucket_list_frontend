import React, {Component} from 'react';
import {render} from 'react-dom';
import CreateBucket from './views/CreateBucket';
import ViewBuckets from './views/ViewBuckets';
import UpdateBucket from './views/UpdateBucket'
import CreateActivity from './views/CreateActivity'
import ViewActivities from './views/ViewActivities'
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
                    <Route path="/bucketlists/view/:bucket_id?" component={ViewBuckets}/>
                    <Route path="/bucketlists/update/:bucket_id" component={UpdateBucket} />
                    <Route path="/bucketlists/:bucket_id/items/create/" component={CreateActivity}/>
                    <Route path="/bucketlists/:bucket_id/items/view/" component={ViewActivities}/>
                </Switch>
            </div>
        )
    }
}
render((
    <BrowserRouter><Index/></BrowserRouter>),
        document.getElementById('app')
);