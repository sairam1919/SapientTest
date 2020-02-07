import { HomeConstants } from "../../utils/Constants";


export function AlertMessageReducer(state = { message: "", type: "" }, action) {
    switch (action.type) {
        case HomeConstants.INFO:
        case HomeConstants.ERROR:
        case HomeConstants.CLEAR:
            {
                const { payload } = action;
                return {
                    ...state,
                    message: payload.message,
                    type: payload.type,
                }
            }
        default:
            return state;
    }
};

export default AlertMessageReducer;