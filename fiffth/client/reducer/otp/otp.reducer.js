import { OPEN_HOME_SCREEN, OTP_CHECKING, OTP_ERROR, } from "../../action/otp/otp.action";

const initialState = {
    isOtpSucess: false,
    isSomethingError: false,
    otpError: "",
    otp_code: "",
    otpCheking: false,
};

export default function otpReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_HOME_SCREEN:
            return {
                ...state,
                isOtpSucess: true
            }
        case OTP_ERROR:
            return {
                ...state,
                otpError: action.value,
                isSomethingError: true //hien dong chu otp khong hop le
            }
        case OTP_CHECKING:
            return {
                ...state,
                otpCheking: action.value,
            }
        default:
            return {
                ...state
            }
    }
}