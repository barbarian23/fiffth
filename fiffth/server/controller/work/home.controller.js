import { HOME_URL, OTP_URL } from "../../constants/work/work.constants";
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

// do login
async function doGetInfomation(numberPhone, month, socket, driver) {
    try {
        console.log("numberPhone ", numberPhone, "month", month);
        // go to login url
        await driver.goto(HOME_URL);

        let selector = "#txtSearch";
        await driver.$eval(selector, (el, value) => el.value = value, numberPhone);

        // select to password input & send password
        selector = "#month";
        await driver.$eval(selector, (el, value) => el.value = value, month);

        // select to button search & click button
        selector = "#fm1 > section > button"; // need to update
        await Promise.all([driver.click(selector), driver.waitForNavigation({ waitUntil: 'networkidle0' })]);

        await timer(2000);

        //lấy ra một DOM - tương đương hàm document.querySelector()
        //lấy ra table result search
        await driver.$$eval("#DivPhanQuyen > table", spanData => spanData.map((span) => {
            console.log("dataFromLoginSummarySpan is: ", span.innerHTML);
            //  if(table != null){
            //      socket.send(SOCKET_ADD_INFORMATION, {number: number, month: month, kvcode: kvcode, money: money});
            //     return {number: number, month: month, kvcode: kvcode, money: money}
            // }else
            //     return null;
        }));
    } catch (e) {
    }
}
export default doGetInfomation;
