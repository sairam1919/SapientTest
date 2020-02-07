export const HomeConstants = {
    url: "https://rickandmortyapi.com/api/character/ ",
    emptyDataMsg: "No Data Found for your Criterias. ",
    createdTime: "created 2 year ago",
    emptyDataAPIRequest: "No Data available in the Database.",
    ALPHANUMERIC_PATTERN: /^[a-zA-Z0-9_ ]*$/,
    EMAIL_PATTERN: "/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/",
    PHONE_NUMBER_PATTERN: "/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/",
    SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
    SIGNIN_FAILED: 'SIGNIN_FAILED',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAILED: 'SIGNUP_FAILED',
    USER_LOGGEDOUT: 'USER_LOGGEDOUT',
    PROJECT_SUCCESS: 'PROJECT_SUCCESS',
    PROJECT_FAILED: 'PROJECT_FAILED',
    PROJECT_LIST: 'PROJECT_LIST'
};