import { HomeConstants } from "../../utils/Constants";

export function signInSuccess(data){
    return{
        type:HomeConstants.SIGNIN_SUCCESS,
        data
    }
}
export function signInFailed(error){
    return{
        type:HomeConstants.SIGNIN_FAILED,
        error
    }
}
export function userLogOut(user){
    return{
        type:HomeConstants.USER_LOGGEDOUT,
    }
}