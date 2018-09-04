import axios from "axios/index";
import * as URL from "../../components/common/urls";

export function userDetailAction(history, access_token) {
    return function (dispatch) {
        axios({
            method: 'get',
            url: URL.PROFILE_DETAIL,
            // data: completeYourProfileDetails,
            headers: { 'Authorization': 'bearer ' + access_token }
        }).then(response => {
            dispatch({type: "PROFILE_DETAIL_SUCCESS", payload: response.data});

        }).catch((error) => {
            if (error && error.response && error.response.data) {
                dispatch({ type: "PROFILE_DETAIL_ERROR", payload: error.response.data })
            } else if (error && error.response && error.response.status === 401) {
                history.push('/login');
            }else {
                dispatch({ type: "PROFILE_DETAIL_ERROR", payload: 'Something went wrong!' })
            }
        });
        dispatch({type: "PROFILE_DETAIL_PENDING"});
    };
}