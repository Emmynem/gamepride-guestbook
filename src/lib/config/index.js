const NAME_REGEX = /^([a-zA-Z]{2,25})$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
const PHONE_REGEX = /^([- +()0-9]{6,15})$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,25}$/;
const baseValidationText = "Validation Error - ";
const baseAPIurl = "https://guestbook.emmynem.com/api";

export const config = {
    token: "token",
    fullname: "fullname",
    NAME_REGEX,
    EMAIL_REGEX,
    PHONE_REGEX,
    PASSWORD_REGEX,
    baseValidationText,
    baseAPIurl
};