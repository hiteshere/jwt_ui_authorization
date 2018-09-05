export function userDetailReducer(state = { data: {}, loading: true, error: false }, action) {
    switch (action.type) {
        case "PROFILE_DETAIL_SUCCESS":
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: action.payload,
                success: true
            });
        case "PROFILE_DETAIL_ERROR":
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: action.payload,
                success: false
            });
        case "PROFILE_DETAIL_PENDING":
            return Object.assign({}, state, {
                loading: true,
                error: false,
                success: false
            });
        default:
            return state;
    }
}

export function jobDetailReducer(state = { data: {}, loading: true, error: false }, action) {
    switch (action.type) {
        case "JOB_DETAIL_SUCCESS":
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: action.payload,
                success: true
            });
        case "JOB_DETAIL_ERROR":
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: action.payload,
                success: false
            });
        case "JOB_DETAIL_PENDING":
            return Object.assign({}, state, {
                loading: true,
                error: false,
                success: false
            });
        default:
            return state;
    }
}