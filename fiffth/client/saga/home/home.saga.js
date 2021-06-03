import { takeLatest, take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { homeConstant } from "../../constants/home/home.constant";
import { 
    START_CRAWL_DATA,
    GET_NUMBER_INFORMATION,
} from "../../action/home/home.action";
import socketClient from "../../service/socket/socket.client.service";
import { 
    SOCKET_WORKING_START_CRAWL_DATA,
    SOCKET_WORKING_CRAWLED_ITEM_DATA ,
    MAIN_URL,
} from "../../../common/constants/common.constants";

const socket = new socketClient(MAIN_URL);

// sử dụng eventChannel để gửi và nhận data qua socket
// const homeSocket = function (data) {
//     // console.log("homeSocket", data);
//     return eventChannel(emitter => {
//         //gửi
//         socket.send(SOCKET_WORKING_SINGLE_NUMBER, { phone: data.data.phone, money: data.data.money });

//         //nhận
//         socket.receive(SOCKET_WORKING_ADDED_NUMBER, function (data) {
//             // console.log("home.saga from server", data);
//             emitter(data || '');
//         });


//         return () => {
//             //unscrible
//         };
//     });
// }

// // nhận kết quả từ socket
// const addNumberSaga = function* (action) {
//     //laasy vee fkeest quar cuar event channel redux
//     let result = yield call(homeSocket, action);

//     //kết quả của socket
//     while (true) {
//         let responce = yield take(result);
//         console.log("responce added", responce);
//         if (responce.status == 200) {
//             console.log("responce added", responce.data);
//             yield put({
//                 type: ADD_PHONE_SUCCESS,
//                 value: responce.data
//             });
//         } else {
//             console.log("responce add fail ", responce.status);
//             yield put ({
//                 type: ADD_PHONE_FAIL,
//                 value: responce.status
//             });
//         }
//     }
// }
// ///////////////////////////////////////
// //get list phone socket
// const getListPhoneSocket = function (data) {
//     // console.log("homeSocket", data);
//     return eventChannel(emitter => {
//         //gửi
//         socket.send(SOCKET_GET_LIST_PHONE, {});

//         //nhận
//         socket.receive(SOCKET_LIST_PHONE, function (data) {
//             console.log("home.saga from server", data);
//             emitter(data || '');
//         });


//         return () => {
//             //unscrible
//         };
//     });
// }

// // nhận kết quả từ socket
// const getListPhoneSaga = function* (action) {
//     //lay vee fkeest quar cuar event channel redux
//     let result = yield call(getListPhoneSocket, action);

//     //kết quả của socket
//     while (true) {
//         let responce = yield take(result);
//         if (responce) {
//             // console.log("responce", responce);
//             yield put({
//                 type: GET_LIST_PHONE_SUCCESS,
//                 value: responce
//             })
//         }
//     }
// }
// ///////////////////////////////////////
// // 
// const deletePhoneSocket = function(data){
//      console.log("delete phone socket", data.data);
//     return eventChannel(emitter => {
//         socket.send(SOCKET_WORKING_DELETE_PHONE,{index: data.data.index, phone: data.data.phone, money: data.data.money, info: data.data.info});
//         socket.receive(SOCKET_WORKING_DELETED_PHONE, function(data){
//             // console.log("delete home.saga from server", data);
//             emitter(data || '');
//         });
//         return () => {
//             // unscrible
//         };
//     });
// }
// // Nhận kết quả từ socket
// const deletePhone = function* (action){
//     //lay vee fkeest quar cuar event channel redux
//     let result = yield call(deletePhoneSocket, action);

//     // ket qua cua socket
//     while(true){
//         let responce = yield take(result);
//         if(responce){
//             console.log("respone", responce);
//             yield put({
//                 type: DELETE_PHONE_SUCCESS,
//                 data: responce
//             })
//         }
//     }

// }

// ///////////////////////////////////////
// // 
// const editPhoneSocket = function(data){
//     console.log("edit phone socket", data.data);
//    return eventChannel(emitter => {
//        socket.send(SOCKET_WORKING_EDIT_PHONE,{index: data.data.index, phone: data.data.phone, money: data.data.money, info: data.data.info});
//        socket.receive(SOCKET_WORKING_EDITED_PHONE, function(data){
//            // console.log("delete home.saga from server", data);
//            emitter(data || '');
//        });
//        return () => {
//            // unscrible
//        };
//    });
// }
// // Nhận kết quả từ socket
// const editPhone = function* (action){
//    //lay vee fkeest quar cuar event channel redux
//    let result = yield call(editPhoneSocket, action);

//    // ket qua cua socket
//    while(true){
//        let responce = yield take(result);
//        if(responce){
//            console.log("respone", responce);
//            yield put({
//                type: EDIT_PHONE_SUCCESS,
//                data: responce
//            })
//        }
//    }
// }

// ///////////////////////////////////////
// // 
// const setIntervalPhoneSocket = function(data){
//     console.log("setinterval listphone socket", data.data);
//    return eventChannel(emitter => {
//        socket.send(SOCKET_SETINTERVAL_PHONE,{listPhone: data.data});
//        socket.receive(SOCKET_SETINTERVALED_PHONE, function(data){
//            // console.log("delete home.saga from server", data);
//            emitter(data || '');
//        });
//        return () => {
//            // unscrible
//        };
//    });
// }
// // Nhận kết quả từ socket
// const setIntervalPhone = function* (action){
//    //lay vee fkeest quar cuar event channel redux
//    let result = yield call(setIntervalPhoneSocket, action);

//    // ket qua cua socket
//    while(true){
//        let responce = yield take(result);
//        if(responce){
//            //console.log("respone", responce);
//            yield put({
//                type: SET_INTERVAL_PHONE_SUCCESS,
//                data: {
//                     info: responce.info,
//                     index: responce.index,
//                 }
//            })
//        }
//    }

// }

// ///////////////////////////////////////
// // 
// socket.receive(SOCKET_LOG, function(data){
//     console.log("server log", data);
// });


// sử dụng eventChannel để gửi và nhận data qua socket
// 
const startCrawlDataSocket = function(data){
    console.log("startCrawlDataSocket", data.data);
   return eventChannel(emitter => {
       socket.send(SOCKET_WORKING_START_CRAWL_DATA,{listPhone: data.data.listPhone, nameFile: data.data.nameFile});
       socket.receive(SOCKET_WORKING_CRAWLED_ITEM_DATA, function(data){
           console.log("crawl item home.saga from server", data);
           emitter(data || '');
       });
       return () => {
           // unscrible
       };
   });
}
// Nhận kết quả từ socket
const startCrawlData = function* (action){
   //lay vee fkeest quar cuar event channel redux
   let result = yield call(startCrawlDataSocket, action);

   // ket qua cua socket
   while(true){
       let responce = yield take(result);
       if(responce){
           console.log("respone", responce);
           yield put({
               type: GET_NUMBER_INFORMATION,
               data: responce // responce bao gom: index & phone da duoc crawl success du data cua phone null hay khong
           })
       }
   }

}

export const watchHome = function* () {
    yield takeLatest (START_CRAWL_DATA, startCrawlData);
}