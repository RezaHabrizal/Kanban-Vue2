<template>
  <div>
    <Login
      v-if="!isLogin"
      @emitHasToken="changeIsLogin"
      @emitGetRegister="getRegisterPage"
      :registerValue="registerValue"
    ></Login>
    <Register v-else-if="pageRegister" @emitDoRegister="doRegister"></Register>
    <Home
      v-else-if="!changePage"
      @emitChangePage="doChangePage"
      @emitDoLogout="doLogOut"
    ></Home>
    <EditTask
      v-else-if="editValue"
      :editValue="editValue"
      @getEdit="getEdit"
    ></EditTask>
  </div>
</template>

<script>
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import EditTask from "./views/EditTask.vue";
import axios from "./API/BaseURL";
import Register from "./views/Register";

export default {
  name: "app",
  data() {
    return {
      message: "HALLO VUE",
      isLogin: false,
      changePage: false,
      editValue: {},
      pageRegister: false,
      registerValue: {
        email: "adadada",
        name: "",
        password: null,
      },
    };
  },
  components: {
    Home,
    Login,
    EditTask,
    Register,
  },
  methods: {
    changeIsLogin(val) {
      this.isLogin = val;
    },
    doChangePage(val) {
      this.changePage = val;
      this.editValue = val;
    },
    getEdit() {
      this.changePage = true;
      axios({
        method: "PUT",
        url: `/tasks/${this.editValue.id}`,
        data: {
          title: this.editValue.title,
          description: this.editValue.description,
          dueDate: this.editValue.dueDate,
          priority: this.editValue.priority,
          category: this.editValue.category,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.changePage = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRegisterPage() {
      this.pageRegister = true;
      this.isLogin = true;
    },
    doRegister(val) {
      const { email, password, name } = val;
      axios({
        method: "POST",
        url: "/register",
        data: {
          name,
          email,
          password,
        },
      })
        .then((response) => {
          this.isLogin = false;
          this.pageRegister = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doLogOut() {
      this.isLogin = false;
      localStorage.access_token = "";
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log("User signed out.");
      });
      localStorage.clear();
    },
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
};
</script>

<style></style>
