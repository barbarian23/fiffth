import {
    GET_LENGHT_LIST,
    GET_NUMBER_INFORMATION,
    GET_NUMBER_INFORMATION_SUCCESS,
} from '../../action/home/home.action';

const initialState = {
    something: undefined,
    listPhone: [],
    phoneNumberChecking: {
        index: "",
        phone: "",
    },
    sumIndex: "",
};

export default function homeReducer(state = initialState, action) {
    // console.log("[homeReducers " + action.type + "]", action.value);

    switch (action.type) {
        case GET_LENGHT_LIST:
            console.log("sum index", action.data.sumIndex);
            let tempIndex = [...state.sumIndex];
            tempIndex = action.data.sumIndex;
            return {
                ...state,
                sumIndex: tempIndex,
            }
        case GET_NUMBER_INFORMATION:
            console.log("phone ", action.data.index, " ",action.data.phone );
            let tempNumber = [...state.phoneNumberChecking];
            tempNumber.index = action.data.index;
            tempNumber.phone = action.data.phone;
            return {
                ...state,
                phoneNumberChecking: tempNumber,
            }
        case GET_NUMBER_INFORMATION_SUCCESS:
            return {
                ...state,
            }
        default:
            return {
                ...state
            }
    }
}