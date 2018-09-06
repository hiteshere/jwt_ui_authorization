import React, { Component } from "react";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { checkOtpAction} from "../../actions/signup/signupAction"
import { userReVerifyAction} from "../../actions/signup/loginAction"

class VerifyUser extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.checkOtp = this.checkOtp.bind(this)
        this.state = {
            fields: {},
            open: false,
            errors:{},
            show_login: 'none'

        };
    }

    checkOtp() {
        if(this.state.fields['otp'] != ""){
            this.props.checkOtpAction(this.state.fields['otp'])
        }
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

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
        if(this.handleValidation()){
            this.props.userReVerifyAction(this.state.fields['email'])
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

    componentWillReceiveProps(nextProps){
        if (nextProps.userReVerifyReducer && nextProps.userReVerifyReducer.data && nextProps.userReVerifyReducer.success === true){
            nextProps.userReVerifyReducer.success = false
            this.setState({ open: true });
            
        }
        else if (nextProps.userReVerifyReducer && nextProps.userReVerifyReducer.data && nextProps.userReVerifyReducer.error === true){
            let error_array
            for (let key in nextProps.userReVerifyReducer.data) {
                error_array = nextProps.userReVerifyReducer.data[key];
            }
            alert(error_array)
            
        }
        if (nextProps.otpCheckReducer && nextProps.otpCheckReducer.success === true){
            nextProps.otpCheckReducer.success == false
            let errors = {}
            errors["otp_error"] = "user verified. Click on link below to login.";
            this.setState({
                errors : errors,
                show_login: 'block'
            })
        }
        else if(nextProps.otpCheckReducer && nextProps.otpCheckReducer.data && nextProps.otpCheckReducer.error === true && nextProps.otpCheckReducer.success === false){
            let errors = {}
            for (let key in nextProps.otpCheckReducer.data) {
                errors["otp_error"] = nextProps.otpCheckReducer.data[key];
            }
            this.setState({
                errors : errors,
                show_login: 'none'
            })
        }
        
    }


    render(){
        return(
            
            <div>
                
                <p>User credential for account re-verification</p>
                <form name="user_reverify" onSubmit={this.submitForm}>
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
                    <input type="reset" onClick={this.resetForm} value="Reset values"/>
                    <input type="submit" value="Submit"/>
                </form>

                {/* reverify user popup */}
                {/* confirm popup */}
                <Modal open={this.state.open} showCloseIcon={false} closeOnEsc={false} closeOnOverlayClick={false} center>
                    <br/>
                    <p>please enter the code sent to you.</p>
                    <input type="text" name="otp" onChange={this.handleChange.bind(this, "otp")} value={this.state.fields["otp"]}/>
                    <button onClick={() => this.checkOtp(this)}>Send OTP</button>
                    <span>  {this.state.fields && this.state.errors['otp_error']}</span>
                    <div className="modal-footer modal-center-btn">
                    </div>
                    <br/>
                    <div style= {{display: this.state.show_login}}>
                        <Link to="/login">Login</Link>
                    </div>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        userReVerifyReducer: state.userReVerifyReducer,
        otpCheckReducer: state.otpCheckReducer,
    }
}

VerifyUser = connect(mapStateToProps, {checkOtpAction, userReVerifyAction})(VerifyUser);
export default VerifyUser;