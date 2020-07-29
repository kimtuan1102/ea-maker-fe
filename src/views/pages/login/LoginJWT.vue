<template>
  <div>
    <vs-input
      v-validate="'required|min:3'"
      data-vv-validate-on="blur"
      name="username"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Account"
      v-model="username"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("username") }}</span>

    <vs-input v-on:keydown.enter="loginJWT"
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3"
        >Remember Me</vs-checkbox
      >
      <router-link to="/pages/forgot-password">Forgot Password?</router-link>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button type="border" @click="registerUser">Register</vs-button>
      <vs-button :disabled="!validateForm" @click="loginJWT">Login</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "tuantk",
      password: "Matkhau1@",
      checkbox_remember_me: false
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.username != "" && this.password != "";
    }
  },
  methods: {
    checkLogin() {
      let getToken = localStorage.getItem("accessToken");
      if (getToken) {
        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });
        return true
      }
      return false
      // If user is already logged in notify
      // if (this.$store.state.auth.isUserLoggedIn()) {

      //     // Close animation if passed as payload
      //     // this.$vs.loading.close()

      //     this.$vs.notify({
      //         title: 'Login Attempt',
      //         text: 'You are already logged in!',
      //         iconPack: 'feather',
      //         icon: 'icon-alert-circle',
      //         color: 'warning'
      //     })

      //     return false
      // }
      // return true
    },
    loginJWT() {
      // if (this.checkLogin()) return;

      // Loading
      this.$vs.loading();

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          username: this.username,
          password: this.password
        },
        // gui ham this.$acl.change de cap nhat role
        aclChangeRole: this.$acl.change
      };

      this.$store
        .dispatch("auth/loginJWT", payload)
        .then(() => {
          this.$vs.loading.close();
        })
        .catch(error => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Lỗi! ",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
        });
    },
    registerUser() {
      if (!this.checkLogin()) return;
      this.$router.push("/pages/register").catch(() => {});
    }
  },
  created() {
    this.$vs.loading.close()
    //    if (this.checkLogin()){
    //        //get query
    //        //this.$route.query.from
    //        this.$router.replace('/home')
    //   }
  },
  mounted() {
    // this.$vs.loading()
  }
};
</script>
