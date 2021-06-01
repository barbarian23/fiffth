import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import '../../assets/css/login/login.css';
import { otpConstant } from '../../constants/otp/otp.constant';
import { OTP_CHECKING } from '../../action/otp/otp.action';
export default function otp(props) {
    let otp = "";
    let updateOTP = (e) => {
        otp = e.target.value;
    }

    let dispatch = useDispatch();
    let dispatchToStore = (action) => {
        dispatch(action);
    }

    return (
        <div>
            <div className="crawl-login">
                <div className="crawl-login-username-password">
                    <div className="crawl-login-username-password-upper">
                        <span>{otpConstant.otpTitle}</span>
                    </div>
                    <div className="crawl-login-username-password-below">
                        <input type="text" id="otp" placeholder={otpConstant.otpPlaceholder} onChange={updateOTP} />
                    </div>
                </div>
                <div className="crawl-login-button-submit" id="crawl_login_button_submit"
                    onClick={() => dispatchToStore({ type: OTP_CHECKING, data: { otp: otp } })}>
                    <span>{otpConstant.otpButton}</span>
                </div>
            </div>
        </div>
    )
}