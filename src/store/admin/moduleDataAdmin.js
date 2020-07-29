
import state from './moduleDataAdminState.js'
import mutations from './moduleDataAdminMutations.js'
import actions from './moduleDataAdminAction.js'
import getters from './moduleDataAdminGetters.js'

export default {
    isRegistered: false,
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
  }