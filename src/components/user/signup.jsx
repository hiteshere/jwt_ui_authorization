import React, { Component } from "react";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import { userCreationAction } from "../../actions/signup/signupAction"

class Signup extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
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
    submitForm(e){
        console.log('data here'+ e)
        this.props.userCreationAction(this.state)
        e.preventDefault();
    }
    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value});
    }
    resetForm(event){
        window.location.reload();
    }
    onCloseModal () {
        this.setState({ open: false });
        this.props.history.push("/login");
    }
    loginRedirect() {
        this.props.history.push("/login");
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.signUpReducer && nextProps.signUpReducer.data && nextProps.signUpReducer.data.id != null && nextProps.signUpReducer.success === true){
            console.log(nextProps.signUpReducer.data)
            this.setState({ open: true });
            
        }
    }


    render(){
        return(
            
            <div>
                
                <p>User credential for account creation!</p>
                <form name="signup" onSubmit={this.submitForm}>
                    <legend className="text">New user sign up</legend>
                    <br/>
                    <div>
                        <span>Email id  </span>
                        <input  type="text" name = "email" placeholder="email" onChange={this.handleChange}/>
                        <span>  {this.state && this.state.email}</span>
                    </div>
                    <br/>
                    <div>
                        <span>Password  </span>
                        <input  type="text" name = "password" placeholder="password" onChange={this.handleChange}/>
                        <span>  {this.state && this.state.password}</span>
                    </div>
                    <br/>
                    <div>
                        <span>User first name  </span>
                        <input  type="text" name = "first_name" placeholder="first name" onChange={this.handleChange}/>
                        <span>  {this.state && this.state.first_name}</span>
                    </div>
                    <br/>
                    <div>
                        <span>User last name  </span>
                        <input  type="text" name = "last_name" placeholder="last name" onChange={this.handleChange}/>
                        <span>  {this.state && this.state.last_name}</span>
                    </div>
                    <br/>
                    <div>
                        <span>Company name  </span>
                        <input  type="text" name = "company_name" placeholder="compnay name" onChange={this.handleChange}/>
                        <span>  {this.state && this.state.company_name}</span>
                    </div>
                    <br/>
                    <div>
                        <span>Company type </span>
                        {/* <input  type="text" name = "company_type" placeholder="company type" onChange={this.handleChange}/> */}
                        <select value={this.state.company_type} name = "company_type" placeholder="company type" onChange={this.handleChange}>
                            <option defaultValue>Select...</option>
                            <option value="IT">It</option>
                            <option value="FINANCIAL">Financial</option>
                            <option value="SPACE">Space</option>
                            <option value="SPIRITUAL">Spiritual</option>
                        </select>
                        <span>  {this.state && this.state.company_type}</span>
                    </div>
                    <br/>
                    <div>
                        <span>Designation  </span>
                        <input  type="text" name = "designation" placeholder="designation" onChange={this.handleChange}/>
                        <span>  {this.state && this.state.designation}</span>
                    </div>
                    <br/>
                    
                    <input type="reset" onClick={this.resetForm} value="Reset values"/>
                    <input type="submit" value="Create User"/>
                </form>
                <p>Already Have an accout.</p>
                <a href="/login">Login</a>

                {/* confirmation popup */}
                {/* confirm popup */}
                <Modal open={this.state.open} onClose={this.onCloseModal} closeOnEsc={false} closeOnOverlayClick={false} center>
                    <br/>
                    <p>You have successfully created user with {this.state.email} please go to login.</p>
                    <div className="modal-footer modal-center-btn">
                        <a className="btn primary-btn" href="/login">LOGIN</a>
                    </div>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        signUpReducer: state.signUpReducer,
    }
}

Signup = connect(mapStateToProps, {userCreationAction})(Signup);
export default Signup;