import * as URL from "../../components/common/urls";
import axios from "axios/index";

/**
 * Action for user agreement
 * @param accessToken [access token]
 * @returns {Function} [dispatch response or error to reducer]
 */
export function userLoginAction(signUpDetails) {
    return function (dispatch) {
        axios({
            method: "post",
            url: URL.LOGIN_URL,
            data: signUpDetails
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('name', response.data.name);
            dispatch({type: "USER_LOGIN_SUCCESS", payload: response.data});

        }).catch((error) => {
            if (error && error.response && error.response.data) {
                dispatch({type: "USER_LOGIN_ERROR", payload: error.response.data});
            }
        });
        dispatch({type: "USER_LOGIN_PENDING"});
    };
}

export function userReVerifyAction(userDetails) {
    return function (dispatch) {
        axios({
            method: "post",
            url: URL.OTP_RECHECK_URL,
            data: { 'email' : userDetails}
        }).then(response => {
            dispatch({type: "OTP_RECHECK_SUCCESS", payload: response.data});

        }).catch((error) => {
            if (error && error.response && error.response.data) {
                dispatch({type: "OTP_RECHECK_ERROR", payload: error.response.data});
            }
        });
        dispatch({type: "OTP_RECHECK_PENDING"});
    };
}
