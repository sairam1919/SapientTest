import ActionConstants from '../../utils/ActionConstants';

/**
 * Reducer function that returns new state for the action of types
 * FETCH_DATA_LOADING, FETCH_DATA_ERROR, FETCH_DATA_SUCCESS
 */
const defaultFetchState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
}
export function fetchDataReducer(state = defaultFetchState, action) {
    let newState
    switch (action.type) {
        case ActionConstants.FETCH_DATA_LOADING: {
            newState = {
                ...state,
                isLoading: action.isLoading,
                isSuccess: false,
                isError: false,
                data: state.data
            }
            return newState;
        }
        case ActionConstants.FETCH_DATA_ERROR: {
            newState = {
                ...state,
                isLoading: false,
                isSuccess: false,
                isError: action.isError,
                data: state.data
            }
            return newState;
        }
        case ActionConstants.FETCH_DATA_SUCCESS: {
            newState = {
                ...state,
                isLoading: false,
                isSuccess: action.isSuccess,
                isError: false,
                data: action.data
            }
            return newState;
        }
        default:
            return state;
    }
}