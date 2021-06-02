import { HOME_URL, OTP_URL } from "../../constants/work/work.constants";
import { SOCKET_SOMETHING_ERROR, SOCKET_LOGIN_INCORRECT, SOCKET_LOGIN_STATUS } from "../../../common/constants/common.constants";
import { getListTdInformation, getTdInformation } from "../../service/util/utils.server";
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
        selector = "#Div_Param > div:nth-child(2) > div:nth-child(3) > button"; // need to update
        await Promise.all([driver.click(selector), driver.waitForNavigation({ waitUntil: 'networkidle0' })]);

        await timer(2000);

        //lấy ra table result search - chỉ lấy phần row data
        await driver.$$eval("#tbody_td_207", spanData => spanData.map((span) => {
            console.log("dataFromTable is: ", span.innerHTML);
            if (span.innerHTML.length == "") { //  table k co du lieu >> k them vao excel
                socket.send(SOCKET_NOT_ADD_INFORMATION, { status: "SDT khong ton tai du lieu" });
            } else {
                let listTdTag = getListTdInformation(span.innerHTML);
                // crawl BTS_NAME
                let btsName = getTdInformation(listTdTag[1]);
                // crawl MATINH - important
                let maTinh = getTdInformation(listTdTag[2]);
                // crawl TOTAL_TKC - optional
                let totalTKC = getTdInformation(listTdTag[3]);
                socket.send(SOCKET_ADD_INFORMATION, { numberPhone: numberPhone, btsName: btsName, maTinh: maTinh, totalTKC: totalTKC });
            }
        }));
    } catch (e) {
    }
}
export default doGetInfomation;
