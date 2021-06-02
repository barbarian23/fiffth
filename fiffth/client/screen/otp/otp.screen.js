import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../assets/css/otp/otp.css';
import { otpConstant } from '../../constants/otp/otp.constant';
import { OTP_CHECKING } from '../../action/otp/otp.action';
import { useHistory } from "react-router";
export default function otp(props) {
    let dispatch = useDispatch();
    let otp = "";
    let updateOTP = (e) => {
        console.log("input otp", e.target.value);
        otp = e.target.value;
    }

    let dispatchToStore = (action) => {
        dispatch(action);
    }

    let history = useHistory();
    let {isOtpSuccess} = useSelector(state => state.otp);
    useEffect(() => {
        // dieu huong sang home
        console.log("is otp success", isOtpSuccess);
        if (isOtpSuccess) {
            history.push("/home");
        }
    }, [isOtpSuccess]);
    return (
        <div>
            <div className="crawl-otp">
                <div className="crawl-otp-input">
                    <div className="crawl-otp-input-upper">
                        <span>{otpConstant.otpTitle}</span>
                    </div>
                    <div className="crawl-otp-input-below">
                        <input type="text" id="otp" placeholder={otpConstant.otpPlaceholder} onChange={updateOTP} />
                    </div>
                </div>
                <div className="crawl-otp-button-submit" id="crawl_otp_button_submit"
                    onClick={() => dispatchToStore({ type: OTP_CHECKING, data: { otpchecking: otp } })}>
                    <span>{otpConstant.otpButton}</span>
                </div>
            </div>
        </div>
    )
}