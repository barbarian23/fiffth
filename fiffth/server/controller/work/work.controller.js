import socketServer from "../../service/socket/socket.server.service";
import csvService from "../../service/csv/csv.server.service";
import {
    SOCKET_LOGIN,
    SOCKET_LOGIN_STATUS,
    SOCKET_GET_LIST_PHONE,
    SOCKET_LIST_PHONE,
    SOCKET_LOG
} from "../../../common/constants/common.constants";
import doLogin from "../work/login.controller";
import { HOME_URL, WAIT_TIME, MAXIMUM_INTERVAL } from "../../constants/work/work.constants";
import { getListTdTag, getListMiddleNumber, getListNumberMoney, verifyNumberPhone } from "../../service/util/utils.server";

const puppeteer = require('puppeteer');
//C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe
//C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe
let exPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
var driver;

//puppeteer
//socket
var socket = null;


const preparePuppteer = function () {
    return new Promise((res, rej) => {
        puppeteer.launch({
            args: ["--no-sandbox", "--proxy-server='direct://'", '--proxy-bypass-list=*'],
            headless: true,
            ignoreHTTPSErrors: true,
            executablePath: exPath == "" ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" : exPath
        })
            .then(async (browser) => {
                let pageLogin = await browser.newPage();
                pageLogin.setViewport({ width: 2600, height: 3800 });

                res(pageLogin);
            }).catch(e => {
                rej(e);
            });

    });
}

const workingController = async function (server) {
    try {
        driver = await preparePuppteer();
        //khoi tao socket 
        socket = socketServer(server);
        socket.receive((receive) => {
            //login
            receive.on(SOCKET_LOGIN, login);

            //otp

            //tra cứu số
        });
    } catch (e) {
        console.error("loi puppteer hoac socket", e);

    }
}

//login
const login = function (data) {
    console.log("login voi username va password", data.username, data.password);
    doLogin(data.username, data.password, socket, driver);
}

//otp

//tra cứu số
const getNumberInfo = async (phone) => {
    //let rd = Math.floor(Math.random() * 10);
    return new Promise(async (res, rej) => {
        try {
            //lấy ra đoạn html
            let htmlContent = await watchPhone(phone);

            //lấy ra các tr
            let listTr = await getListTrInTable(htmlContent);

            //lấy ra số điện thoại, có thể bao gồm với các ngoặc ><. dùng tr thứ 5
            let numberSpecial = await getMiddleNumber(listTr[5]);
            //lấy ra number
            let number = await getNumberMoney(numberSpecial[0]);
            console.log("phone", phone, "money", number[0]);

            res(number[0]);

        } catch (e) {
            console.log("getNumberInfo error ", phone , e);
            rej(e);
        }
    });
}


//lấy ra đoạn html bằng 1 đoạn javascript
const watchPhone = async (phone) => {
    return new Promise(async (res, rej) => {
        try {
            
            res(html);
        } catch (e) {
            console.log("error watchPhone",phone, e);
            rej(e);
        }
    });
}


//lấy ra các thẻ table từ đoạn html
const getListTrInTable = async (htmlContent) => {
    return new Promise(async (res, rej) => {
        let listTrTag = await getListTdTag(htmlContent);
        //await socket.send(SOCKET_LOG, { message: "list tr", data: listTrTag });
        res(listTrTag);
    });
}

//lấy ra number có thể kèm theo các ký tự đặc biệt như ><
const getMiddleNumber = (listTr) => {
    return new Promise(async (res, rej) => {
        let numberWithSpecial = await getListMiddleNumber(listTr);
        //await socket.send(SOCKET_LOG, { message: "number uiwth spcial tr", data: numberWithSpecial });
        res(numberWithSpecial);
    });
}

//lấy ra number từ 1 đoạn string có chứa số kèm theo 1 số ký tư đặc biệt như ><
const getNumberMoney = (numberSpecial) => {
    return new Promise(async (res, rej) => {
        let number = await getListNumberMoney(numberSpecial);
        //await socket.send(SOCKET_LOG, { message: "number", data: number });
        res(number);
    });
}


let random = () => {
    let rd = Math.floor(Math.random() * 10);
    console.log("number random", rd);
    return rd;
}

export default workingController;