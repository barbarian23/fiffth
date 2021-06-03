import socketServer from "../../service/socket/socket.server.service";
// import csvService from "../../service/csv/csv.server.service";
import {
    SOCKET_LOGIN,
    SOCKET_OTP,
    SOCKET_WORKING_START_CRAWL_DATA,
} from "../../../common/constants/common.constants";
import doLogin from "../work/login.controller";
import doOTPChecking from "../work/otp.controller";
import doGetInfomation from "../work/home.controller";
import { forEach } from "lodash";

const puppeteer = require('puppeteer');
//C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe
//C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe
let exPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
var driver;

//puppeteer
//socket
var socket = null;
var excel = require('excel4node');
var wb, ws;


const preparePuppteer = function () {
    return new Promise((res, rej) => {
        puppeteer.launch({
            args: ["--no-sandbox", "--proxy-server='direct://'", '--proxy-bypass-list=*'],
            headless: false,
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
            receive.on(SOCKET_OTP, doOTP);

            //tra cứu số
            receive.on(SOCKET_WORKING_START_CRAWL_DATA, doGetInfor);
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
const doOTP = function (data) {
    console.log("Xac thuc voi OTP : ", data.otp);
    doOTPChecking(data.otp, socket, driver);
}

// crawl data
const doGetInfor = function (data) { // crawl data in table
    console.log("data from client: ", data);
    createFileExcel(data.nameFile);

    data.listPhone.forEach((item, index) => {
        setTimeout(() => {
            console.log("Tra cuu so thu ", index, " phone ", item.phone);
            let today = new Date();
            doGetInfomation(item.phone, today.getFullYear() + '-' + (today.getMonth + 1), ws, socket, driver);
        }, 2000);
    })
}

//// foreach
////prepare file xlsx to save data
//ghi ra từng ô
async function writeHeader(wb, ws) {
    try {
        let style = wb.createStyle({
            alignment: {
                vertical: ['center'],
                horizontal: ['center'],
                wrapText: true,
            },
            font: {
                bold: true,
                name: 'Arial',
                color: '#4e3861',
                size: 12,
            },
        });

        ws.cell(1, 1).string("STT").style(style);
        ws.cell(1, 2).string("SĐT").style(style);
        ws.cell(1, 3).string("BTS_NAME").style(style);
        ws.cell(1, 4).string("MA_TINH").style(style);
        ws.cell(1, 5).string("TOTAL_TKC").style(style);
    } catch (e) {
        console.log("e", e);
    }
}

const createFileExcel = function (data) {
    console.log(" file name from client", data);

    wb = new excel.Workbook();
    ws = wb.addWorksheet('Tra cứu');

    ws.column(1).setWidth(5);//STT
    ws.column(2).setWidth(30);//Số thuê bao,
    ws.column(3).setWidth(30);//BTS_NAME,
    ws.column(4).setWidth(30);//MA_TINH,
    ws.column(5).setWidth(30);//TOTAL_TKC

    writeHeader(wb, ws);
    let today = new Date();
    let fileName = "Tra cứu_" + data + "_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + "_" + today.getHours() + today.getMinutes() + ".xlsx";
    wb.write(fileName);
}
////////////////////////


let random = () => {
    let rd = Math.floor(Math.random() * 10);
    console.log("number random", rd);
    return rd;
}

export default workingController;