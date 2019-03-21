import {CHANGE_EMAIL, CHANGE_NAME, CHANGE_PASSWORD, SET_AVATAR, SET_NAME_DEFINED} from "../actions/actionTypes";

const InitialState = {
    name: 'Man without name',
    nameIsSet: false,
    email: '',
    password: '',
    avatar: null,
};
const infoReducer = (state = InitialState, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return {...state, name: action.payload};
        case SET_NAME_DEFINED:
            return {...state, nameIsSet: action.payload};
        case CHANGE_EMAIL:
            return {...state, email: action.payload};
        case CHANGE_PASSWORD:
            return {...state, password: action.payload};
        case SET_AVATAR:
            return {...state, avatar: action.payload};
        default:
            return state;
    }
};

export default infoReducer;