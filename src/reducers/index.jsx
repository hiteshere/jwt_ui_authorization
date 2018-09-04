import { combineReducers } from 'redux';
import { signUpReducer } from './signupReducer';
import { loginReducer } from './loginReducer';
import { userDetailReducer } from './profileReducer';

const appReducers = combineReducers({
    signUpReducer: signUpReducer,
    loginReducer:loginReducer,
    userDetailReducer:userDetailReducer,
});

const reducers = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = action.data;
    }

    return appReducers(state, action)
};
export default reducers;
