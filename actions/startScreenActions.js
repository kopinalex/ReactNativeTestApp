import {CHANGE_EMAIL, CHANGE_NAME, CHANGE_PASSWORD, SET_AVATAR, SET_NAME_DEFINED} from "./actionTypes";

export function setName(name) {
    return {type: CHANGE_NAME, payload: name}
}

export function setNameDefined(isDefine) {
    return {type: SET_NAME_DEFINED, payload: isDefine}
}

export function setEmail(email) {
    return {type: CHANGE_EMAIL, payload: email}
}

export function setPassword(password) {
    return {type: CHANGE_PASSWORD, payload: password}
}

export function setAvatar(avatar) {
    return {type: SET_AVATAR, payload: avatar}
}

