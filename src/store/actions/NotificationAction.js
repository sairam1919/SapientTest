import { HomeConstants } from "../../utils/Constants";


/**
 * Action creator to display an information notifcation
 * @param {String} message
 */
export const notifyInfo = (message) => (dispatch, getState) => {
    dispatch({
        type: HomeConstants.INFO,
        payload: {
            message,
            type: HomeConstants.INFO
        }
    });
};

/**
 * Action creator to display an error notifcation
 * @param {String} message
 */
export const notifyError = (message) => (dispatch, getState) => {
    dispatch({
        type: HomeConstants.ERROR,
        payload: {
            message,
            type: HomeConstants.ERROR
        }
    });
};

/**
 * Action creator to clear a warning notifcation
 */
export const notifyClearWarning = () => (dispatch, getState) => {
    dispatch({
        type: HomeConstants.CLEAR,
        payload: {
            message: "",
            type: ""
        }
    });
};