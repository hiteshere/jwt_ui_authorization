import * as URL from "../../components/common/urls";
import axios from "axios/index";

/**
 * Action for user agreement
 * @param accessToken [access token]
 * @returns {Function} [dispatch response or error to reducer]
 */
export function userCreationAction(signUpDetails) {
    return function (dispatch) {
        axios({
            method: "post",
            url: URL.SIGNUP_URL,
            data: signUpDetails
        }).then(response => {
            dispatch({type: "USER_CREATION_SUCCESS", payload: response.data});
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                dispatch({type: "USER_CREATION_ERROR", payload: error.response.data});
            }
        });
        dispatch({type: "USER_CREATION_PENDING"});
    };
}


export function checkOtpAction(otp) {
    return function (dispatch) {
        axios({
            method: "post",
            url: URL.OTP_URL,
            data: {'otp':otp}
        }).then(response => {
            dispatch({type: "OTP_CHECK_SUCCESS", payload: response.data});
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                dispatch({type: "OTP_CHECK_ERROR", payload: error.response.data});
            }
        });
        dispatch({type: "OTP_CHECK_PENDING"});
    };
}