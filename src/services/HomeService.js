import  { HomeConstants }from "../utils/Constants";
import  { fetchDataAction }  from "../store/actions/HomeAction";
import ActionConstants from "../utils/ActionConstants";



export function fetchDataAPI() {
    return (dispatch) => {
    dispatch(fetchDataAction(ActionConstants.FETCH_DATA_LOADING, true, ''));
    fetch(HomeConstants.url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(items => {
            dispatch(fetchDataAction(ActionConstants.FETCH_DATA_SUCCESS, true, items.results));
        })
        .catch(err => {
            dispatch(fetchDataAction(ActionConstants.FETCH_DATA_ERROR, true, err));
        });
    };
}