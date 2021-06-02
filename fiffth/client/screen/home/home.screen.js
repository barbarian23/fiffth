import React, { useState, useEffect } from "react";
import '../../assets/css/home/home.css';
import { TR_TYPE_TIME, TR_TYPE_SETUP } from "../../constants/home/home.constant";
import { GET_LENGHT_LIST, GET_NUMBER_INFORMATION } from "../../action/home/home.action";
import { readFileExcel, createFileExcel } from "../../service/excel/excel.client.service";
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
    const [mTime, setMTime] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const dispatch = useDispatch();
    let phoneNumberChecking = useSelector(state => state.home.phoneNumberChecking);
    let sumIndex = useSelector(state => state.home.sumIndex);
    // let listPhone = useSelector(state => state.home.listPhone);

    // thay doi % hoan thien crawl 
    // useEffect(() => {
    //     console.log("current list phone", listPhone);
    //     if (listPhone.length === 0) {
    //         dispatch({ type: GET_LIST_PHONE, data: null });
    //     }
    //     // khoi tao interval - duy nhat 1 lan
    //     dispatch({ type: SET_INTERVAL_PHONE });
    // }, []);

    let readFile = (e) => {
        readFileExcel(e.target.files[0], (data) => {
            setIsTracking(true);
            //data là mảng chứa danh sách thuê bao và số tiền
            dispatch({type: GET_LENGHT_LIST, data: {sumIndex: data.length}});
            data.forEach((item, index) => {
                //Bỏ qua dòng đầu vì là tiêu đề
                if (index > 0) {
                    console.log("data in file excel", item);
                    dispatch({ type: GET_NUMBER_INFORMATION, data: { phone: item[0], index: item[1] } });
                }
            });
        });

        //phải cần dòng dưới, vì nếu như lần thứ hai chọn cùng 1 file, sẽ không được tính là opnchange, hàm onchange sẽ không gọi lại
        e.target.value = null;
    }

    let onInputTime = (e) => {
        setMTime(e.target.value);
    }

    let downloadFile = (e) => {
        createFileExcel(sampleData);
    }

    let setUpTime = () => {
        dispatch({ type: ADD_PHONE, data: { mTime: mTime } });
    }

    let percentProcess = (index, sum) => {
        console.log("sum ", sum);
        return ((index / sum) * 100).toFixed(2);
    }
    return (
        <div className="crawl-login" id="div_craw">
            {
                !isTracking ?
                    <div className="crawl-login">
                        <div className="input-add-div">
                            <input className="input-add" type="text" placeholder={TR_TYPE_TIME} onChange={onInputTime} />
                            <input className="input-add-button" type="button" value={TR_TYPE_SETUP} onClick={setUpTime} />
                        </div>
                        <div id="crawl_login_file_input_up">
                            {/* <img id="img_file_input" src='../assets/images/file.png' /> */}
                            <label htmlFor="xlsx">Bấm vào đây để chọn tệp(excel)</label>
                            <input type="file"
                                id="xlsx" name="xlsx"
                                accept="xlsx" onChange={readFile} />
                            <span id="span_file_input_error"></span>
                        </div>
                    </div>
                    :
                    null
            }
            {
                isTracking ?
                    <div>
                        <div className="animation-tracking">
                            <div className="crawl-loading-parent" id="div_loginin_loading">
                                <div className="crawl-login-loading">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="shadow"></div>
                                    <div className="shadow"></div>
                                    <div className="shadow"></div>
                                </div>
                            </div>
                        </div>
                        <div className="tracking-index-number">
                            <text>Đang tra cứu tới số thứ {phoneNumberChecking.index}</text>
                        </div>
                        <div className="tracking-index-number">
                            <text>Hoàn thành {percentProcess(phoneNumberChecking.index, sumIndex)}%</text>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
}