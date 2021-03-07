const state = {
    token: localStorage.getItem(process.env.VUE_APP_TOKEN_LS_KEY),
    authState: localStorage.getItem(process.env.VUE_APP_AUTHSTATE_LS_KEY),
    user: localStorage.getItem(process.env.VUE_APP_USER_LS_KEY)
}

const getters = {
    getUser(state) {
        return JSON.parse(state.user)
    },
    getToken(state) {
        return state.token
    },
    fetchAuthState(state) {
        return state.authState
    },
    isAuthed(state) {
        // return true;
        return state.token ? true : false;
    }
}

const actions = {
    storeUser({ commit }, user) {
        commit("storeUser", user)
    },
    storeAuthState({ commit }, state) {
        commit("storeAuthState", state)
    },
    storeToken({ commit }, token) {
        commit("storeToken", token)
    }
}

const mutations = {
    storeUser(state, value) {
        if (!value) {
            state.user = {}
            localStorage.removeItem(process.env.VUE_APP_USER_LS_KEY)
            return
        }
        value = JSON.stringify(value)
        state.user = value
        localStorage.setItem(process.env.VUE_APP_USER_LS_KEY, value)
        return
    },
    storeAuthState(state, value) {
        if (!value) {
            state.authState = null
            localStorage.removeItem(process.env.VUE_APP_AUTHSTATE_LS_KEY)
            return
        }
        state.authState = value
        localStorage.setItem(process.env.VUE_APP_AUTHSTATE_LS_KEY, value)
        return
    },
    storeToken(state, value) {
        if (!value) {
            state.token = null
            localStorage.removeItem(process.env.VUE_APP_TOKEN_LS_KEY)
            return
        }
        state.token = value
        localStorage.setItem(process.env.VUE_APP_TOKEN_LS_KEY, value)
        return
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
