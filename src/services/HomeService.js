import  { HomeConstants }from "../utils/Constants";
import  { fetchDataAction }  from "../store/actions/HomeAction";
import ActionConstants from "../utils/ActionConstants";



export function fetchDataAPI() {
    return (dispatch) => {
    console.log("URL: ", HomeConstants.url);
    dispatch(fetchDataAction(ActionConstants.FETCH_DATA_LOADING, true, ''));
    fetch(HomeConstants.url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(items => {
            console.log("items",items);
            dispatch(fetchDataAction(ActionConstants.FETCH_DATA_SUCCESS, true, items.results));
        })
        .catch(err => {
            dispatch(fetchDataAction(ActionConstants.FETCH_DATA_ERROR, true, err));
        });
    };
}