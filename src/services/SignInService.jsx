import { signInSuccess, signInFailed } from "../store/actions/SignInActions"

export function signInUser(data) {
    // return (dispatch) => {
    //     fetch('https://reqres.in/api/users',{
    //         method:'post',
    //         body: {},
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         }
    //     })
    //     .then(items => {
    //         console.log("items",items);
    //         dispatch(signInSuccess({
    //             "isLogin": true,
    //             "statuscode":0,
    //             "description":"Successfully LoggedIn",
    //             "data":{
    //                 "user_name":'suresh',"id": "001","user_role":'admin'}
    //         }));
    //     })
    //     .catch(err => {
    //         dispatch(signInFailed(err));
    //     });
    // };
    return (dispatch) => {
        
            dispatch(signInSuccess({
                "isLogin": true,
                "statuscode":0,
                "description":"Successfully LoggedIn",
                "data":data
            }));
       
    };
}

