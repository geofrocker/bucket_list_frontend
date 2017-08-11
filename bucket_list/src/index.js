import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import Header from './components/Header';
import SideBar from './components/Sidebar';


class Index extends Component{
    render(){
        return (
            <div>
                <Header/>
                <SideBar/>
            </div>
        )
    }
}
ReactDOM.render(<Index/>, document.getElementById('app'));