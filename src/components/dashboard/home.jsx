import React, { Component } from "react";
import {Route, Switch} from 'react-router-dom'
import Dashboard from "./dashboard";
import JobDetail from "../user/job_detail";


class Home extends Component {

    render() {
        return (
            <div>
                <div>
                    <Switch>
                        <Route path='/home/dashboard' component={Dashboard} />
                        <Route path='/home/job_detail' component={JobDetail} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default (Home);