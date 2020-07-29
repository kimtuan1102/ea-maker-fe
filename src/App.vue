<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
<div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
</div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'
import jwt from "@/http/requests/auth/jwt/index.js"
import axios from "@/axios.js"

export default {
    data() {
        return {
            vueAppClasses: [],
        }
    },
    watch: {
        '$store.state.theme'(val) {
            this.toggleClassInBody(val)
        },
        '$vs.rtl'(val) {
            document.documentElement.setAttribute("dir", val ? "rtl" : "ltr")
        }
    },
    methods: {
        toggleClassInBody(className) {
            if (className == 'dark') {
                if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
                document.body.classList.add('theme-dark')
            } else if (className == 'semi-dark') {
                if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
                document.body.classList.add('theme-semi-dark')
            } else {
                if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
                if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
            }
        },
        setAppClasses(classesStr) {
            this.vueAppClasses.push(classesStr)
        },
        handleWindowResize() {
            this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

            // Set --vh property
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        },
        handleScroll() {
            this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY)
        }
    },
    mounted() {
        this.toggleClassInBody(themeConfig.theme)
        this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    async created() {
        let that = this

        window.OneSignal.push(function () {
            // window.OneSignal.init({
            //     //appId: "e3582811-6a5e-41db-8d43-5411c655c1d0",
            //     appId: "74e27466-c47a-4b6a-855c-ef87da4c8ced",
            //     // requiresUserPrivacyConsent: true,
            //     autoResubscribe: true,
            //     notifyButton: {
            //         enable: true,
            //     },

            //     subdomainName: "eamake.os.tc",
            //     /* The label for your site that you added in Site Setup mylabel.os.tc */
            //     // persistNotification: true,
            //     // Depends if you're testing or not
            //     allowLocalhostAsSecureOrigin: true
            // });

            //Neu ko co quyen thi showNativePrompt
            // Occurs when the user's subscription changes to a new value.
            window.OneSignal.on('subscriptionChange', function (isSubscribed) {
                console.log("The user's subscription state is now:", isSubscribed);
                if (isSubscribed) window.OneSignal.showNativePrompt();

            });

            //Neu chua duoc dang ky thi showNativePrompt
            window.OneSignal.getUserId(function (userId) {
                console.log("OneSignal User ID:", userId);
                if (userId == null) {
                    window.OneSignal.showNativePrompt();
                }
                // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
            });

            window.OneSignal.on('notificationPermissionChange', function (permissionChange) {
                var currentPermission = permissionChange.to;
                console.log('New permission state:', currentPermission);
                //Neu bat thong bao thi add tag

            });

            window.OneSignal.on('notificationDisplay', function (event) {
                console.log('OneSignal notification displayed:', event);
                //Nhan duoc thong bao goi ham reload tai khoan
                if (event.data.type == "balance") {
                    that.$store.dispatch('getBalance').then((success) => {
                        console.log("Reload lai tai khoan ", success)
                    }).catch((error) => {
                        console.log(error)
                    })
                }
                // Admin nhan duoc thong bao goi lai danh sach transaction
                else if (event.data.type == "money") {
                    that.$store.dispatch("dataAdmin/getTransaction")
                }
                // Super admin nhan duoc thong bao admin duyet bot
                // Or  Admin nhan thong bao lead dang ky bot
                else if (event.data.type == 'admin_approve_bot' || event.data.type == 'lead_buy_bot') {
                    that.$store.dispatch("dataAdmin/getAccountConfig")
                }
               
            });

            /* These examples are all valid */
            window.OneSignal.isPushNotificationsEnabled(function (isEnabled) {
                if (isEnabled) {
                    console.log("Push notifications are enabled!");
                    //set tags ng dung khi bat / tat thong bao
                    let usr = JSON.parse(localStorage.getItem('userInfo'))
                    window.OneSignal.sendTags({
                        "userid": usr.userId,
                        "username": usr.userName,
                        "is_superadmin": usr.userRole === 'superadmin',
                        "is_admin": usr.userRole === 'admin',
                        "is_lead": usr.userRole === 'lead'
                    }, function (tagsSent) {
                        // Callback called when tags have finished sending
                        console.log("tagsSent", tagsSent);
                    });
                } else
                    console.log("Push notifications are not enabled yet.");
            });

            /* These examples are all valid */
            window.OneSignal.getTags().then((tags) => {
                // All the tags stored on the current webpage visitor
                console.log("tags", tags);
            });

            // window.OneSignal.deleteTag("userid");

            // //Them tags
            // window.OneSignal.sendTag("userid", "12", function (tagsSent) {
            //     // Callback called when tags have finished sending
            //      console.log("tagsSent", tagsSent);
            // });
            //Xoa tag
            // window.OneSignal.push(function () {
            //     window.OneSignal.deleteTag("tagKey");
            // });

        });

        //window.OneSignal.setSubscription(true);

        // let myCustomUniqueUserId = "12";

        // window.OneSignal.push(function () {
        //     window.OneSignal.setExternalUserId(myCustomUniqueUserId);
        // });

        // console.log('test', 'Ham chay dau tien')
        // await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        // .then(response=>{console.log('response',response)})
        // console.log('test', 'Tiep tuc')

        //Goi ham truoc khi ung dung bat dau
        // jwt
        jwt.init()

        // load default accesstoken 

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
        // this.$store.commit("SET_BEARER", localStorage.getItem('accessToken'))

        let dir = this.$vs.rtl ? "rtl" : "ltr"
        document.documentElement.setAttribute("dir", dir)

        window.addEventListener('resize', this.handleWindowResize)
        window.addEventListener('scroll', this.handleScroll)

        // Auth0
        try {
            await this.$auth.renewTokens()
        } catch (e) {
            console.error(e)
        }

    },
    destroyed() {
        window.removeEventListener('resize', this.handleWindowResize)
        window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>
