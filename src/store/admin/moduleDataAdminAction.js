import axios from "@/axios.js"

export default {
    getTransaction({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get("/api/transaction/")
                .then((response) => {
                    commit('SET_TRANSACTION', response.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    getAccountMt4Parent({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get("/api/account-mt4/")
                .then((response) => {
                    commit('SET_ACCOUNT_MT4_PARENT', response.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    getServerIp({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get("/api/server-info/")
                .then((response) => {
                    commit('SET_SERVER_IP', response.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    getAccountConfig({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get("/api/account-config/")
                .then((response) => {
                    commit('SET_ACCOUNT_CONFIG', response.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    approveTransaction({ commit }, idTrans) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/transaction/approve/${idTrans}`)
                .then((response) => {
                    if (response.data.code > 200) {
                        reject(new Error(response.data.message))
                    } else {

                        commit('UPDATE_ITEM', { id: idTrans, value: { status: 1 } })
                        resolve(response)
                    }
                })
                .catch((error) => { reject(error) })
        })
    },

    rejectTransaction({ commit }, idTrans) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/transaction/reject/${idTrans}`)
                .then((response) => {
                    if (response.data.code > 200) {
                        reject(new Error(response.data.message))
                    } else {
                        commit('UPDATE_ITEM', { id: idTrans, value: { status: 2 } })
                        resolve(response)
                    }
                })
                .catch((error) => { reject(error) })
        })
    },
    adminApproveBot({ commit }, payload) { 
        return new Promise((resolve, reject) => {
            axios.post(`/api//account-config/admin-approve/${payload.id}`, payload.body)
                .then((response) => {
                    if (response.data.code > 200) {
                        reject(new Error(response.data.message))
                    } else {
                        commit('UPDATE_ITEM_ACCOUNT_CONFIG', { id: payload.id, value: { status: 1 } })
                        resolve(response)
                    }
                })
                .catch((error) => { reject(error) })
        })
    },
    adminRejectBot({ commit }, idTrans) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/account-config/admin-reject/${idTrans}`)
                .then((response) => {
                    if (response.data.code > 200) {
                        reject(new Error(response.data.message))
                    } else {
                        commit('UPDATE_ITEM_ACCOUNT_CONFIG', { id: idTrans, value: { status: 2 } })
                        resolve(response)
                    }
                })
                .catch((error) => { reject(error) })
        })
    },
    superAdminApproveBot({ commit }, payload) {
        return new Promise((resolve, reject) => { 
            axios.post(`/api/account-config/superadmin-approve/${payload.id}`,payload.body)
                .then((response) => {
                    if (response.data.code > 200) {
                        reject(new Error(response.data.message))
                    } else {
                        commit('UPDATE_ITEM_ACCOUNT_CONFIG', { id: payload.id, value: { status: 3 } })
                        resolve(response)
                    }
                })
                .catch((error) => { reject(error) })
        })
    },
    superAdminRejectBot({ commit }, idTrans) { 
        return new Promise((resolve, reject) => {
            axios.post(`/api/account-config/super-admin-reject/${idTrans}`)
                .then((response) => {
                    if (response.data.code > 200) {
                        reject(new Error(response.data.message))
                    } else {
                        commit('UPDATE_ITEM_ACCOUNT_CONFIG', { id: idTrans, value: { status: 4 } })
                        resolve(response)
                    }
                })
                .catch((error) => { reject(error) })
        })
    },
}