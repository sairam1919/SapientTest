import { HomeConstants } from "../../utils/Constants";

export function signInReducer(state = { isLogin: false }, action={}){
    console.log('state', state);
    switch(action.type){
        case HomeConstants.SIGNIN_SUCCESS:
            return {
                ...state,
                isLogin:action.data.isLogin,
                userDetails: action.data,
            }
        case HomeConstants.SIGNIN_FAILED:
                return {
                    ...state,
                    isLogin:false,
                    userDetails: null
                }
        case HomeConstants.USER_LOGGEDOUT:
                return {
                    ...state,
                    isLogin:false,
                    userDetails: null
                }
        default:
                return {
                    ...state
                }
    }
}