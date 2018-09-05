import React, { Component } from "react";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { userCreationAction, checkOtpAction } from "../../actions/signup/signupAction"

class Signup extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.checkOtp = this.checkOtp.bind(this)
        this.state = {
            fields: {},
            open: false,
            errors:{}

        };
    }

    checkOtp() {
        this.props.checkOtpAction(this.state.fields['otp'])
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        // First name
        if(!fields["first_name"]){
           formIsValid = false;
           errors["first_name"] = "First name cannot be empty";
        }
        else if(!fields["first_name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["first_name"] = "Only letters";
         }

         // Last name
        if(!fields["last_name"]){
            formIsValid = false;
            errors["last_name"] = "Last name cannot be empty";
        }
        else if(!fields["last_name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["last_name"] = "Only letters";
         }

         // Password
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
        }else if(fields["password"].length > 16){
            formIsValid = false;
            errors["password"] = "Password cannot more than 16 characters";
        }

        if(!fields["company_name"]){
            formIsValid = false;
            errors["company_name"] = "Company name cannot be empty";
        }

        if(!fields["company_type"]){
            formIsValid = false;
            errors["company_type"] = "Company type cannot be empty";
        }

        if(!fields["designation"]){
            formIsValid = false;
            errors["designation"] = "Designation cannot be empty";
        }

        //Email
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Email cannot be empty";
        }
        else if(!filter.test(fields["email"])){
            formIsValid = false;
           errors["email"] = "Email format not correct";
        }

       this.setState({errors: errors});
       return formIsValid;
   }

    submitForm(e){
        console.log('data here'+ e)
        if(this.handleValidation()){
            this.props.userCreationAction(this.state.fields)
        }
        e.preventDefault();
    }
    
    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    resetForm(event){
        this.setState({
            fields: {},
            errors: {}
        })
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
        else if (nextProps.signUpReducer && nextProps.signUpReducer.data && nextProps.signUpReducer.error === true){
            let error_array
            for (let key in nextProps.signUpReducer.data) {
                error_array = nextProps.signUpReducer.data[key][0];
            }
            alert(error_array)
            
        }
        if (nextProps.otpCheckReducer && nextProps.otpCheckReducer.success === true){
            nextProps.otpCheckReducer.success == false
            let errors = {}
            errors["otp_error"] = "";
            this.setState({
                errors : errors
            })
            this.props.history.push("/login");
        }
        else if(nextProps.otpCheckReducer && nextProps.otpCheckReducer.error === true && nextProps.otpCheckReducer.success === false){
            let errors = {}
            errors["otp_error"] = "Invalid OTP. Try again";
            this.setState({
                errors : errors
            })
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
                        <input  type="text" name = "email" placeholder="email" 
                        onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                        <span>  {this.state.fields && this.state.fields['email']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["email"]}</span>
                    <br/>
                    <br/>
                    <div>
                        <span>Password  </span>
                        <input  type="text" name = "password" placeholder="password"
                        onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                        <span>  {this.state.fields && this.state.fields['password']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["password"]}</span>
                    <br/>
                    <br/>
                    <div>
                        <span>User first name  </span>
                        <input  type="text" name = "first_name" placeholder="first name"
                        onChange={this.handleChange.bind(this, "first_name")} value={this.state.fields["first_name"]}/>
                        <span>  {this.state.fields && this.state.fields['first_name']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["first_name"]}</span>
                    <br/>
                    <br/>
                    <div>
                        <span>User last name  </span>
                        <input  type="text" name = "last_name" placeholder="last name"
                        onChange={this.handleChange.bind(this, "last_name")} value={this.state.fields["last_name"]}/>
                        <span>  {this.state.fields && this.state.fields['last_name']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["last_name"]}</span>
                    <br/>
                    <br/>
                    <div>
                        <span>Company name  </span>
                        <input  type="text" name = "company_name" placeholder="compnay name"
                        onChange={this.handleChange.bind(this, "company_name")} value={this.state.fields["company_name"]}/>
                        <span>  {this.state.fields && this.state.fields['company_name']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["company_name"]}</span>
                    <br/>
                    <br/>
                    <div>
                        <span>Company type </span>
                        {/* <input  type="text" name = "company_type" placeholder="company type" onChange={this.handleChange}/> */}
                        <select  name = "company_type" placeholder="company type"
                        onChange={this.handleChange.bind(this, "company_type")} value={this.state.fields["company_type"]}>
                            <option defaultValue>Select...</option>
                            <option value="IT">It</option>
                            <option value="FINANCIAL">Financial</option>
                            <option value="SPACE">Space</option>
                            <option value="SPIRITUAL">Spiritual</option>
                        </select>
                        <span>  {this.state.fields && this.state.fields['company_type']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["company_type"]}</span>
                    <br/>
                    <br/>
                    <div>
                        <span>Designation  </span>
                        <input  type="text" name = "designation" placeholder="designation"
                        onChange={this.handleChange.bind(this, "designation")} value={this.state.fields["designation"]}/>
                        <span>  {this.state.fields && this.state.fields['designation']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["designation"]}</span>
                    <br/>
                    <br/>
                    <input type="reset" onClick={this.resetForm} value="Reset values"/>
                    <input type="submit" value="Create User"/>
                </form>
                <p>Already Have an accout.</p>
                <Link to="/login">Login</Link>

                {/* confirmation popup */}
                {/* confirm popup */}
                <Modal open={this.state.open} showCloseIcon={false} onClose={this.onCloseModal} closeOnEsc={false} closeOnOverlayClick={false} center>
                    <br/>
                    <p>You have successfully created user with {this.state.fields["email"]} please enter the code sent to you.</p>
                    <input type="text" name="otp" onChange={this.handleChange.bind(this, "otp")} value={this.state.fields["otp"]}/>
                    <button onClick={() => this.checkOtp(this)}>Submit</button>
                    <span>  {this.state.fields && this.state.errors['otp_error']}</span>
                    <div className="modal-footer modal-center-btn">
                    {/* <a className="btn primary-btn" href="/login">LOGIN</a> */}
                    </div>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        signUpReducer: state.signUpReducer,
        otpCheckReducer: state.otpCheckReducer,
    }
}

Signup = connect(mapStateToProps, {userCreationAction, checkOtpAction})(Signup);
export default Signup;