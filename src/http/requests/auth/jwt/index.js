import axios from "../../../axios/index.js"
import store from "../../../../store/store.js"
import router from '@/router'

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

export default {
  init() {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // const { config, response: { status } } = error
      const { config, response } = error
      const originalRequest = config

      // if (status === 401) {
      if (response && response.status === 401) {
        //TH lay refesh token bi loi thi quay lai form dang nhap
        if (response.headers['x-final-url'].indexOf('/refresh/') > 0) {
          //Chuyen huong neu refesh token het han
          router.push('/pages/login')
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userInfo');
          //clear thông báo
          //Xoa cac tags de khong nhan thong bao
          window.OneSignal.push(function () {
            /* These examples are all valid */
            window.OneSignal.deleteTags(["userid", "username", "is_superuser", "is_admin", "is_lead"]);
            return Promise.reject(error)
          })

          // Change role on logout. Same value as initialRole of acj.js
          this.$acl.change('anymouse')
        }
        // alert(window.location.href)
        //Token het han
        // alert("Token het han")
        //Th tai form dang nhap sai
        if (!localStorage.getItem("refreshToken")) {
          return Promise.reject(error)
        }
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          store.dispatch("auth/fetchAccessToken")
            .then((responseData) => {
              //Cap nhat lai acsettoken moi
              isAlreadyFetchingAccessToken = false
              onAccessTokenFetched(responseData.data.access)
              localStorage.setItem('accessToken', responseData.data.access);
              //Cap nhat bearer 
              //store.dispatch("updateUserInfo",responseData.data.access); 
              store.dispatch("auth/updateAccessToken", responseData.data.access)

            })
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(access_token => {
            originalRequest.headers.Authorization = 'Bearer ' + access_token
            resolve(axios(originalRequest))
          })
        })

        return retryOriginalRequest
      }
      return Promise.reject(error)
    })
  },
  login(username, pwd) {
    return axios.post("/api/token/", { username: username, password: pwd })
  },
  registerUser(name, email, pwd) {
    return axios.post("/api/auth/register/", { displayName: name, email: email, password: pwd })
  },
  refreshToken() {
    return axios.post("/api/token/refresh/", { refresh: localStorage.getItem("refreshToken") })
  }
}
