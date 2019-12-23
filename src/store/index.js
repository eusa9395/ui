import Vue from 'vue';
import Vuex from 'vuex';
import menus from './modules/menus';
import app from './modules/app';
import getters from './getters';
// import user from './modules/user'
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        app,
        menus
    },
    getters,
    plugins: [createLogger()],
    strict: debug
})
