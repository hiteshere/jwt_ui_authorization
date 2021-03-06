export function signUpReducer(state = { data: {}, loading: true, error: false }, action) {
    switch (action.type) {
        case "USER_CREATION_SUCCESS":
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: action.payload,
                success: true
            });
        case "USER_CREATION_ERROR":
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: action.payload,
                success: false
            });
        case "USER_CREATION_PENDING":
            return Object.assign({}, state, {
                loading: true,
                error: false,
                success: false
            });
        default:
            return state;
    }
}

export function otpCheckReducer(state = { data: {}, loading: true, error: false, success: false}, action) {
    switch (action.type) {
        case "OTP_CHECK_SUCCESS":
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: action.payload,
                success: true
            });
        case "OTP_CHECK_ERROR":
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: action.payload,
                success: false
            });
        case "OTP_CHECK_PENDING":
            return Object.assign({}, state, {
                loading: true,
                error: false,
                success: false
            });
        default:
            return state;
    }
}