<template>
  <div class="login">
    <b-container>
      <b-row align-h="center">
        <b-col sm="8">
          <br>
          <h2>You have to login first.</h2>
          <br>
        </b-col>
        <b-col sm="8">
          <b-form @submit="onSubmit">
            <b-form-group id="input-group-email"
              label="Email address:"
              label-for="input-email">
              <b-form-input id="input-email"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="input-group-password"
              label="Password:"
              label-for="input-password">
              <b-form-input id="input-password"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password">
              </b-form-input>
            </b-form-group>
            <b-container>
              <b-row v-if="isWaitingForLogin" align-h="center">
                <b-col align-self="center" sm="1">
                  <b-spinner variant="primary" label="Spinning"></b-spinner>
                  <br>
                </b-col>
              </b-row>
              <b-row align-h="center">
                <b-col sm="8">
                  <b-alert :show="error.show" variant="danger">{{ error.message }}</b-alert>
                </b-col>
                <b-col sm="8">
                  <b-alert :show="successMessage !== null" variant="success">{{ successMessage }}</b-alert>
                </b-col>
              </b-row>
              <b-row align-h="end">
                <b-col sm="0">
                  <br>
                  <b-button type="submit" variant="primary">Login</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';

@Component({
  data() {
    return {
      isWaitingForLogin: false,
      error: {
        show: false,
        message: '',
      },
      successMessage: null,
      form: {
        email: '',
        password: '',
      }
    };
  },
  methods: {
    showError(message: string) {
      this.$data.error.message = message;
      this.$data.error.show = true;
    },
    hideError() {
      this.$data.error.show = false;
    },
    onSubmit(event) {
      event.preventDefault();
      this.$data.isWaitingForLogin = true;

      // @ts-ignore
      this.hideError();

      Axios.post(`${this.$store.state.apis.authentication.base}/login`, {
          email: this.$data.form.email,
          password: this.$data.form.password,
          provider: 'users'
      }).then((res) => {

        // Save the token and user info on localStorage
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.data.usuario));

        // Show some info to the user
        this.$data.successMessage = res.data.message;
        this.$data.isWaitingForLogin = false;

        setTimeout(() => {
          this.$router.push({ path: '/'});
          this.$router.go(0);
        }, 1000);
      }).catch((error) => {
        this.$data.isWaitingForLogin = false;
        // @ts-ignore
        this.showError(error.response.data.errors.message);
      });
    },
  },
})
export default class Login extends Vue {}
</script>
