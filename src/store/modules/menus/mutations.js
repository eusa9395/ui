import * as types from './mutation-type'

const mutations = {
    [types.SAVE_MENUS](state, menus) {
        //console.log("mutations.SAVE_MENUS, menus:" + JSON.stringify(menus));
        state.menus = menus;
    },

    [types.CLEAN_MENUS](state) {
        //console.log("mutations.CLEAN_MENUS");
        state.menus = [];
    }
};

export default mutations
