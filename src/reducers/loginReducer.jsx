export function loginReducer(state = { data: {}, loading: true, error: false }, action) {
    switch (action.type) {
        case "USER_LOGIN_SUCCESS":
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: action.payload,
                success: true
            });
        case "USER_LOGIN_ERROR":
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: action.payload,
                success: false
            });
        case "USER_LOGIN_PENDING":
            return Object.assign({}, state, {
                loading: true,
                error: false,
                success: false
            });
        default:
            return state;
    }
}