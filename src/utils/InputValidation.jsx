import { HomeConstants } from "./Constants";

export function alphaNumericValidation(val){
    return !HomeConstants.ALPHANUMERIC_PATTERN.test(val);
}

export function emailValidation(val){
    return !HomeConstants.EMAIL_PATTERN.test(String(val).toLowerCase());
}
export function phoneNumberValidation(val){
    return !HomeConstants.PHONE_NUMBER_PATTERN.test(val) ? false : true;
}