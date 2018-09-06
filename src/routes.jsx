import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import Login from './components/user/login';
import VerifyUser from './components/user/verify_user';
import Signup from './components/user/signup';
// import Dashboard from './components/dashboard/dashboard';
import Home from './components/dashboard/home';

// let RESPONSE_CODE_SESSION_CLOSED = 401;

class Routes extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLoader: true,
            message: ''
        };

        // let that = this;
        // axios.interceptors.response.use(function (response) {
        //     return response;
        // }, function (error) {
        //     if(error && error.response && error.response.status === RESPONSE_CODE_SESSION_CLOSED){
        //         localStorage.clear();
        //         let msg = '';
        //         if(error.response.data && error.response.data.detail){
        //           if(error.response.data.detail.constructor === Array){
        //             msg = error.response.data.detail[0];
        //           } else {
        //             msg = error.response.data.detail;
        //           }
        //         } else {
        //           msg = 'Your session has been expired. Please login again'
        //         }
        //         that.setState({message: msg}, function(){
        //             $('#session_popup').modal();
        //         });
        //     }
        //     return Promise.reject(error);
        // });
    }

    render(){
        return (
          <div id="root_1">
            <BrowserRouter>
                <Switch>
                    {/* <Route path="/dashboard" component={Dashboard} /> */}
                    <Route path="/home" component={Home} />
                    <Route path="/verify_user" component={VerifyUser} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Signup} />
                </Switch>
            </BrowserRouter>
          </div>
        );
    }
}
export default Routes;
