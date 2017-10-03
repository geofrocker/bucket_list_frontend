import React, {Component} from 'react';
import {render} from 'react-dom';
import CreateBucket from './components/CreateBucket';
import ViewBuckets from './components/ViewBuckets';
import UpdateBucket from './components/UpdateBucket';
import DeleteBucket from './components/DeleteBucket';
import CreateActivity from './components/CreateActivity'
import ViewActivities from './components/ViewActivities'
import UpdateActivity from "./components/UpdateActivity";
import DeleteActivity from './components/DeleteActivity';
import SearchData from './components/SearchData';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
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
                    <Route path="/bucketlists/delete/:bucket_id" component={DeleteBucket} />
                    <Route path="/bucketlists/:bucket_id/items/create/" component={CreateActivity}/>
                    <Route path="/bucketlists/:bucket_id/items/view/" component={ViewActivities}/>
                    <Route path="/bucketlists/:bucket_id/items/update/:item_id" component={UpdateActivity}/>
                    <Route path="/bucketlists/:bucket_id/items/delete/:item_id" component={DeleteActivity}/>
                    <Route path="/search/" component={SearchData}/>
                    <Route path={"/"} component={Login}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        )
    }
}
render((
    <BrowserRouter><Index/></BrowserRouter>),
        document.getElementById('app')
);