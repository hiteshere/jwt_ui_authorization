import { combineReducers } from 'redux';
import { signUpReducer, otpCheckReducer } from './signupReducer';
import { loginReducer, userReVerifyReducer } from './loginReducer';
import { userDetailReducer, jobDetailReducer } from './profileReducer';

const appReducers = combineReducers({
    signUpReducer: signUpReducer,
    otpCheckReducer:otpCheckReducer,
    loginReducer:loginReducer,
    userDetailReducer:userDetailReducer,
    jobDetailReducer:jobDetailReducer,
    userReVerifyReducer: userReVerifyReducer,
});

const reducers = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = action.data;
    }

    return appReducers(state, action)
};
export default reducers;
