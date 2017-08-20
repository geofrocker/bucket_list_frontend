import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import CreateBucket from './views/CreateBucket';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


class Index extends Component{
    render(){
        return (
            <div>
                <Header/>
                <SideBar/>
                <Switch>
                    <Route path="/bucketlists/create" component={CreateBucket}/>
                </Switch>
            </div>
        )
    }
}
render((
    <BrowserRouter><Index/></BrowserRouter>),
        document.getElementById('app')
);