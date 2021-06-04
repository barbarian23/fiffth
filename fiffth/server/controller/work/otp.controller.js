import { OTP_URL, HOME_URL } from "../../constants/work/work.constants";
import { SOCKET_SOMETHING_ERROR, SOCKET_LOGIN_INCORRECT, SOCKET_LOGIN_STATUS } from "../../../common/constants/common.constants";

const DEFAULT_DELAY = 2000;

/**
 * 
 * @param {*} ms sleep đi 1 vài giây, đơn vị là milisecond
 */
function timer(ms) {
    ms = ms == null ? DEFAULT_DELAY : ms;
    return new Promise(res => setTimeout(res, ms));
}

// do otp checking
async function doOTPChecking(otp, socket, driver) {
    try {
        console.log("otp ", otp);
        // go to login url
        // await driver.goto(OTP_URL);

        //wait to complete
        // await driver.waitForFunction('document.readyState === "complete"');

        //lấy ra một DOM - tương đương hàm document.querySelector()
        let dataFromLoginSummarySpan = await driver.$$eval("#content > div.otp-form", spanData => spanData.map((span) => {
            return span.innerHTML;
        }));

        if (dataFromLoginSummarySpan.length > 0) {
            let selector = "#passOTP";
            await driver.$eval(selector, (el, value) => el.value = value, otp);

            // select to button login & click button
            selector = "#loginForm > div.row > button";
            await Promise.all([driver.click(selector), driver.waitForNavigation({ waitUntil: 'networkidle0' })]);

            await timer(2000);

            //đi tới trang thông tin số
            // await driver.goto(HOME_URL);

            // wait to complete
            await driver.waitForFunction('document.querySelector("#txtSearch") != null');

            socket.send(SOCKET_OTP_STATUS, { data: 1 });
        }
    } catch (e) {
        console.log("Login Error", e);
        socket.send(SOCKET_OTP_INCORRECT, { data: -1 });
        socket.send(SOCKET_SOMETHING_ERROR, { data: 0 });
    }
}
export default doOTPChecking;
