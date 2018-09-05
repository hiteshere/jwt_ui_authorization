import React, { Component } from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { jobDetailAction } from "../../actions/profile/profileAction";

class JobDetail extends Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.state = {
            email : '',
            password:'',
            first_name : '',
            last_name : '',
            company_name : '',
            company_type : '',
            designation : '',
            error:'',
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
        this.props.jobDetailAction(this.props.history ,localStorage.getItem('token'));
    }
    
    componentWillReceiveProps(nextProps){
        if (nextProps.jobDetailReducer && nextProps.jobDetailReducer.data && nextProps.jobDetailReducer.success === true){
            console.log(nextProps.jobDetailReducer.data)
            this.setState({
                // 'email': nextProps.jobDetailReducer.data.email,
                // 'first_name': nextProps.jobDetailReducer.data.first_name,
                // 'last_name': nextProps.jobDetailReducer.data.last_name,
                'company_name': nextProps.jobDetailReducer.data.data.company_name,
                'company_type': nextProps.jobDetailReducer.data.data.company_type,
                'designation': nextProps.jobDetailReducer.data.data.designation,
            })
            console.log('Welcome to dashbaord.')
        }else if (nextProps.jobDetailReducer && 
                    nextProps.jobDetailReducer.data && 
                    nextProps.jobDetailReducer.error === true && 
                    nextProps.jobDetailReducer.status != 200 && 
                    nextProps.jobDetailReducer.success === false && 
                    nextProps.jobDetailReducer.loading === false){
            this.setState({
                error: nextProps.jobDetailReducer.data.data.detail,
                open: true
            })
            console.log('Unauthorized.')
        }
    }
    onCloseModal () {
        this.setState({ open: false });
        localStorage.clear();
        this.props.history.push("/login");
    }

    render(){
        if(this.props.jobDetailReducer.loading){
            return(
                <div>
                    <h2>Dashboard is loading...</h2>
                </div>
            )
        }

        return(
            <div>
                <h2>Job details.</h2>
                <table className="width:100%">
                <tr>
                    <th>Company name</th>
                    <th>Company type</th>
                    <th>Designation</th>
                </tr>
                <tr>
                    <td>{this.state.company_name}</td>
                    <td>{this.state.company_type}</td>
                    <td>{this.state.designation}</td>
                </tr>
                <Link to="/home/dashboard">Back</Link>
                </table>
                {/* Status message popup */}
                <Modal open={this.state.open} onClose={this.onCloseModal} closeOnEsc={false} closeOnOverlayClick={false} center>
                    <br/>
                    <p>{this.state.error}</p>
                    <div className="modal-footer modal-center-btn">
                        <button onClick={this.onCloseModal}>GO TO LOGIN</button>
                    </div>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        jobDetailReducer: state.jobDetailReducer,
    }
}

JobDetail = connect(mapStateToProps, {jobDetailAction})(JobDetail);
export default JobDetail;