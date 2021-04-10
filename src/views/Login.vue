<template>
  <section id="login-page">
    <div class="container d-flex flex-direction-row" style="height: 100vh;">
      <div>
        <form style="width: 300px;" @submit.prevent="login">
          <div><h3 style="color: blue;">LOGIN</h3></div>
          <label for=""><h6 style="color: green;">Email</h6></label>
          <input type="email" v-model="email_login" class="form-control" />
          <label for=""><h6 style="color: green;">Password</h6></label>
          <input
            type="password"
            v-model="password_login"
            class="form-control"
          />
          <div class="row" style="padding-top: 1rem;">
            <div class="container d-flex">
              <button type="submit" class="btn btn-primary btn-lg btn-block">
                Login
              </button>
            </div>
          </div>
          <div class="row" style="padding-top: 1rem;">
            <div class="container d-flex">
              <button type="submit" class="btn btn-success btn-lg btn-block">
                Register
              </button>
            </div>
          </div>
        </form>
        <div class="container">
          <p style="width: 300px;">
            ------------------------------------------
          </p>
        </div>
        <div class="container d-flex align-items-center">
          <GoogleLogin
            @click.prevent="login"
            :params="params"
            :renderParams="renderParams"
            :onSuccess="onSuccess"
          ></GoogleLogin>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";

export default {
  components: {
    GoogleLogin,
  },
  data() {
    return {
      tex: "LOGIN",
      email_login: "",
      password_login: "",
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id:
          "701067894054-k7vptnosktap768isgqfavh1t3t8g5sr.apps.googleusercontent.com",
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email: this.email_login,
          password: this.password_login,
        },
      })
        .then((response) => {
          localStorage.access_token = response.data.access_token;
          this.$emit("emitHasToken", true);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          (this.email_login = ""), (this.password_login = "");
        });
    },
    onSuccess(googleUser) {
      console.log(googleUser);
      var id_token = googleUser.getAuthResponse().id_token;
      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());

      axios({
        method: "POST",
        url: "http://localhost:3000/googlelogin",
        data: {
          googleToken: id_token,
        },
      }).then((response) => {
        localStorage.access_token = response.data.access_token;
        this.$emit("emitHasToken", true);
      });
    },
  }
};
</script>

<style></style>
