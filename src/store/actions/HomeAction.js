import ActionConstants from "../../utils/ActionConstants";

export function fetchDataAction(type, bool, data) {
    switch (type) {
        case ActionConstants.FETCH_DATA_LOADING:
            return {
                type: ActionConstants.FETCH_DATA_LOADING,
                isLoading: bool
            }
        case ActionConstants.FETCH_DATA_ERROR:
            return {
                type: ActionConstants.FETCH_DATA_ERROR,
                isError: bool
            }
        case ActionConstants.FETCH_DATA_SUCCESS:
            return {
                type: ActionConstants.FETCH_DATA_SUCCESS,
                isSuccess: bool,
                data
            }
        default:
            return {}
    }
}
