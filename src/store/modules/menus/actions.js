import * as constants from './constants';
import http from '../../../axios/http';

const doFetch = commit => {
    //console.log("actions.doFetch");
    const debug = process.env.NODE_ENV === 'development';
    // const debug = true;
    //console.log("debug = " + debug);
    if (debug) {
        return http.get(constants.FETCH_MENUS_URL_DEBUG).then(response => {
            //console.log(JSON.stringify(response));
            if (response['code'] === 200) {
                let menus = response['menuInfo'];
                //window.localStorage.setItem(constants.STORAGE_KEY_MENUS, JSON.stringify(menus));
                //window.localStorage.setItem(constants.STORAGE_KEY_MENUS_LAST_LOAD_TIME, new Date().getTime());
                commit('SAVE_MENUS', menus);
            } else {
                //console.log("-------------" + JSON.stringify(response));
                //commit('SAVE_MENUS', response);
            }
        }).catch(function (error) {
            console.warn("error:" + error);
        });
    } else {
        return http.get(constants.FETCH_MENUS_URL).then(response => {
            if (response['code'] === 200) {
                let menus = response['menuInfo'];
                commit('SAVE_MENUS', menus);
            } else {
            }
        }).catch(function (error) {
            console.warn("error:" + error);
        });
    }
};

const doClean = commit => {
    //console.log("actions.doClean");
    window.localStorage.removeItem(constants.STORAGE_KEY_MENUS);
    window.localStorage.removeItem(constants.STORAGE_KEY_MENUS_LAST_LOAD_TIME);
    commit('CLEAN_MENUS');
};

const doFetchFromStorage = commit => {
    //console.log("actions.doFetchFromStorage");
    let menusJson = window.localStorage.getItem(constants.STORAGE_KEY_MENUS);
    let menus = JSON.parse(menusJson);
    commit('SAVE_MENUS', menus);
};

export const loadMenus = ({commit}) => {
    //console.log("actions.loadMenus");
    let lastLoadTime = window.localStorage.getItem(constants.STORAGE_KEY_MENUS_LAST_LOAD_TIME);
    //console.log("lastLoadTime = " + lastLoadTime);
    if (lastLoadTime) {
        if (isNaN(lastLoadTime)) {
            //console.log("lastLoadTime isNaN");
            return doClean(commit);
        } else if ((new Date().getTime() - parseInt(lastLoadTime)) > 1800000) {
            doClean(commit);
            return doFetch(commit);
        } else {//使用缓存的menus
            //console.log("--------------1");
            return doFetchFromStorage(commit);
        }
    } else {
        //console.log("--------------2");
        doClean(commit);
        return doFetch(commit);
    }
};

export const cleanMenus = ({commit}) => {
    doClean(commit);
};
