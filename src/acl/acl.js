import Vue from "vue";
import { AclInstaller, AclCreate, AclRule } from "vue-acl";
import router from "@/router";

Vue.use(AclInstaller);

let initialRole = "anymouse";
let notfoundUrl = "/pages/not-authorized";
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo && userInfo.userRole) initialRole = userInfo.userRole;
if (!userInfo) notfoundUrl = "/pages/login";

export default new AclCreate({
  initial: initialRole,
  notfound: notfoundUrl ,//"/pages/not-authorized",
  //notfound: "/pages/login",
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule("admin").generate(),
    superadmin: new AclRule("superadmin").generate(),
    guest: new AclRule("guest").generate(),
    lead: new AclRule("lead").generate(),
    editor: new AclRule("editor").or("admin").generate(),
    public: new AclRule("superadmin").or("admin").or("lead").or("guest").or("anymouse").generate(),
    // anymouse: new AclRule("anymouse").generate()
    // public: new AclRule("public").or("admin").or("editor").generate(),
  }
});
