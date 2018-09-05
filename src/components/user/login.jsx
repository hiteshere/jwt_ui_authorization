import React, { Component } from "react";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { userLoginAction } from "../../actions/signup/loginAction"

class Login extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.state = {
            fields: {},
            errors:{},
            open: false,

        };
    }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

         // Password
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
        }else if(fields["password"].length > 16){
            formIsValid = false;
            errors["password"] = "Password cannot more than 16 characters";
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
        if(this.handleValidation()){
            this.props.userLoginAction(this.state.fields)
        }
        e.preventDefault();
    }
    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    resetForm(event){
        this.setState({ fields: {}, errors: {} })
    }
    onCloseModal () {
        this.setState({ open: false });
        window.location.reload();
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.loginReducer && nextProps.loginReducer.data && nextProps.loginReducer.data.token != null && nextProps.loginReducer.success === true){
            console.log(nextProps.loginReducer.data)
            console.log('Redirecting to dashbaord now.')
            this.props.history.push("/home/dashboard");
        }
        else if (nextProps.loginReducer && nextProps.loginReducer.error && nextProps.loginReducer.loading === false){
            let error_array
            for (let key in nextProps.loginReducer.data) {
                error_array = nextProps.loginReducer.data[key];
            }
            alert(error_array)
        }
    }

    render(){
        return(
            
            <div>
                
                <p>Login in here !</p>
                <form name="login" onSubmit={this.submitForm}>
                    <legend className="text">Enter Email and Password</legend>
                    <br/>
                    <div>
                        <span>Email id  </span>
                        <input  type="text" name = "email" placeholder="email"
                        onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                        <span>  {this.state && this.state.fields['email']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["email"]}</span>
                    <br/>
                    <br/>
                    <div>
                        <span>Password  </span>
                        <input  type="text" name = "password" placeholder="password"
                        onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                        <span>  {this.state && this.state.fields['password']}</span>
                    </div>
                    <span style={{color: "red",fontSize: 15}}>{this.state.errors && this.state.errors["password"]}</span>
                    <br/>
                    <br/>
                    
                    <input type="reset" onClick={this.resetForm} value="Reset values"/>
                    <input type="submit" value="Login User"/>
                </form>
                {/* <div className="card-body">
                    <form action="" method="post" class="form-horizontal">
                        <div class="position-relative row form-group">
                            <label for="input-small" class="col-form-label-sm col-sm-5 col-form-label">Small Input</label>
                            <div class="col-sm-6">
                                <input id="input-small" name="input-small" placeholder=".form-control-sm" type="text" class="input-sm form-control-sm form-control" />
                            </div>
                        </div>
                        <div class="position-relative row form-group">
                            <label for="input-normal" class="col-sm-5 col-form-label">Normal Input</label>
                            <div class="col-sm-6">
                                <input id="input-normal" name="input-normal" placeholder="Normal" type="text" class="form-control" />
                        </div>
                            </div>
                            <div class="position-relative row form-group">
                            <label for="input-large" class="col-form-label-lg col-sm-5 col-form-label">Large Input</label>
                            <div class="col-sm-6">
                                <input id="input-large" name="input-large" placeholder=".form-control-lg" type="text" class="input-lg form-control-lg form-control" />
                            </div>
                        </div>
                    </form>
                </div> */}
                <p>Does not Have an accout.</p>
                <Link to="/">Signup</Link>

                {/* confirmation popup */}
                {/* confirm popup */}
                <Modal open={this.state.open} onClose={this.onCloseModal} closeOnEsc={false} closeOnOverlayClick={false} center>
                    <br/>
                    <p>Your credentials are not correct with {this.state.email} please login again.</p>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        loginReducer: state.loginReducer,
    }
}

Login = connect(mapStateToProps, {userLoginAction})(Login);
export default Login;