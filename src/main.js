/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
Vue.use(Vuesax);

// axios
import axios from "./axios.js";
Vue.prototype.$http = axios;

//Tu dong refesh token neu gap loi 401
// const interceptor = axios.interceptors.response.use(
//         response => response,
//         error => {
//             // Reject promise if usual error
//             if (error.response.status !== 401) {
//                 return Promise.reject(error);
//             }

//             /* 
//              * When response code is 401, try to refresh the token.
//              * Eject the interceptor so it doesn't loop in case
//              * token refresh causes the 401 response
//              */
//             axios.interceptors.response.eject(interceptor);

//             return axios.post('/api/refresh_token', {
//                 'refresh_token': this._getToken('refresh_token')
//             }).then(response => {
//                 //saveToken();
//                 error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
//                 return axios(error.response.config);
//             }).catch(error => {
//                 //destroyToken();
//                 this.router.push('/login');
//                 return Promise.reject(error);
//             }).finally(interceptor);
//         }
//     );
//
//open cors
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//Cau hinh intercep
// axios.interceptors.response.use(
//   response => {
//     if (response.status === 200 || response.status === 201) {
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(response);
//     }
//   },
// error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         case 400:

//          //do something
//           break;

//         case 401:
//           alert("session expired");
//           //chuyen ve trang dang nhap
//           // router.replace({
//           //   path: "/pages/login",
//           //   query: { to: router.currentRoute.fullPath }
//           // });
//           break;
//         case 403:
//           router.replace({
//             path: "/page/login",
//             query: { redirect: router.currentRoute.fullPath }
//           });
//            break;
//         case 404:
//           alert('page not exist');
//           break;
//         case 502:
//          setTimeout(() => {
//             router.replace({
//               path: "/page/login",
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             });
//           }, 1000);
//       }
//       return Promise.reject(error.response);
//     }
//   }
// );

// API Calls
import "./http/requests";

// mock
import "./fake-db/index.js";

// Theme Configurations
import "../themeConfig.js";

// Firebase
import "@/firebase/firebaseConfig";

// Auth0 Plugin
import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);

// ACL
import acl from "./acl/acl";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

// i18n
import i18n from "./i18n/i18n";

// Vuexy Admin Filters
import "./filters/filters";

// Clipboard
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

// Tour
import VueTour from "vue-tour";
Vue.use(VueTour);
require("vue-tour/dist/vue-tour.css");

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

// Google Maps
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: "YOUR_API_KEY",
    libraries: "places" // This is required if you use the Auto complete plug-in
  }
});

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

//Moment
Vue.use(require('vue-moment'));
import moment from 'moment'
Vue.prototype.moment = moment

// As a plugin
import VueMask from 'v-mask'
Vue.use(VueMask);

// cdn onesignal
// Vue.loadScript("https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js")
//import VueWorker from 'vue-worker'
//Vue.use(VueWorker, 'OneSignalSDKWorker.js')
// Vue.loadScript(`${process.env.BASE_URL}service-worker.js`)
// Vue.loadScript('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');
// If service workers are supported, and one isn't already registered


// Feather font icon
require("./assets/css/iconfont.css");

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

// import './registerServiceWorker';
window.OneSignal = window.OneSignal || [];
window.OneSignal.push(function () {
  window.OneSignal.init({
    appId: "e3582811-6a5e-41db-8d43-5411c655c1d0",
  });
});

//Test tao bien this.$test
Vue.prototype.$test = 1

//Tao ham gui notify mac dinh
//Vi du filter filter = {userid:12}
Vue.prototype.$sendNotify = function (filter, data, title, contents) {
  if (!data) data = {}
  if (!contents) contents = "thông báo từ EA Maker"
  if (!title) title = "Thông báo"
  let basicAuth = "ODQ0ZjZiZTUtM2Y4Yy00NTVlLTliM2UtZDg2NzI0NWJiY2E2"
  let clientId = "e3582811-6a5e-41db-8d43-5411c655c1d0"
  let createFilter = []
  Object.keys(filter)
    .forEach(function eachKey(key) {
      createFilter.push(
        {
          "field": "tag",
          "key": `${key}`,
          "relation": "=",
          "value": `${filter[key]}`
        }
      )

    });
  let message = {
    "app_id": `${clientId}`,
    "data": data,
    "filters": createFilter,
    "contents": {
      "en": contents
    },
    "headings": {
      "en": title
    }
  }
  axios.post("https://cors-anywhere.herokuapp.com/https://onesignal.com/api/v1/notifications", message, {
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

// import './registerServiceWorker';
// Vue.prototype.$OneSignal = 


// Vue.filter('formatDate', function(value) {
//   if (value) {
//     return moment(String(value)).format('MM/DD/YYYY hh:mm')
//   }
// });

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount("#app");
