import React, { Component } from "react";
import {connect} from "react-redux";
import Modal from 'react-responsive-modal';
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
            open: false,

        };
    }
    submitForm(e){
        this.props.userLoginAction(this.state.fields)
        e.preventDefault();
    }
    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    resetForm(event){
        window.location.reload();
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
            alert('User authentication details not correct.')
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
                    <br/>
                    <div>
                        <span>Password  </span>
                        <input  type="text" name = "password" placeholder="password"
                        onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                        <span>  {this.state && this.state.fields['password']}</span>
                    </div>
                    <br/>
                    
                    <input type="reset" onClick={this.resetForm} value="Reset values"/>
                    <input type="submit" value="Login User"/>
                </form>
                <p>Does not Have an accout.</p>
                <a href="/">Signup</a>

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