import { OPEN_HOME_SCREEN, OTP_CHECKING, OTP_ERROR, } from "../../action/otp/otp.action";

const initialState = {
    isOtpSuccess: false,
    isSomethingError: false,
    otpError: "",
    otp_code: "",
    otpCheking: "",
};

export default function otpReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_HOME_SCREEN:
            return {
                ...state,
                isOtpSuccess: true
            }
        // case OTP_ERROR:
        //     return {
        //         ...state,
        //         otpError: action.value,
        //         isSomethingError: true //hien dong chu otp khong hop le
        //     }
        case OTP_CHECKING:
            console.log("otp checking from client", action.data);
            return {
                ...state,
                otpCheking: action.data.otpcheking,
            }
        default:
            return {
                ...state
            }
    }
}