import React, { Component } from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import { userDetailAction } from "../../actions/profile/profileAction";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this)
        this.state = {
            email : '',
            password:'',
            first_name : '',
            last_name : '',
            company_name : '',
            company_type : '',
            designation : '',
            open: false,

        };
    }
    logoutUser(e){
        localStorage.clear();
        this.props.history.push("/login");
    }
    componentWillMount() {
        if (! localStorage.getItem('token')) {
            this.props.history.push('/login')
        }
        this.props.userDetailAction(this.props.history ,localStorage.getItem('token'));
    }
    
    componentWillReceiveProps(nextProps){
        if (nextProps.userDetailReducer && nextProps.userDetailReducer.data && nextProps.userDetailReducer.success === true){
            console.log(nextProps.userDetailReducer.data)
            this.setState({
                'email': nextProps.userDetailReducer.data.email,
                'first_name': nextProps.userDetailReducer.data.first_name,
                'last_name': nextProps.userDetailReducer.data.last_name,
                'company_name': nextProps.userDetailReducer.data.user_job.company_name,
                'company_type': nextProps.userDetailReducer.data.user_job.company_type,
                'designation': nextProps.userDetailReducer.data.user_job.designation,
            })
            console.log('Welcome to dashbaord.')
        }
    }

    render(){
        if(this.props.userDetailReducer.loading){
            return(
                <div>
                    <h2>Dashboard is loading...</h2>
                </div>
            )
        }

        return(
            <div>
                <p>Welcome user {localStorage.getItem('email')}</p>
                <h2>User details.</h2>
                <table className="width:100%">
                <tr>
                    <th>Email</th>
                    <th>User name</th> 
                    <th>Company name</th>
                    <th>Company type</th>
                    <th>Designation</th>
                </tr>
                <tr>
                    <td>{this.state.email}</td>
                    <td>{this.state.first_name} {this.state.last_name}</td>
                    <td>{this.state.company_name}</td>
                    <td>{this.state.company_type}</td>
                    <td>{this.state.designation}</td>
                </tr>
                </table>
                <button disabled="disabled"><Link to="/home/job_detail">See job details only</Link></button>
                <input type="reset" onClick={this.logoutUser} value="Logout"/>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        userDetailReducer: state.userDetailReducer,
    }
}

Dashboard = connect(mapStateToProps, {userDetailAction})(Dashboard);
export default Dashboard;