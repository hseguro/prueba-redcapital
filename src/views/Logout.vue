<template>
  <div class="logout">
    <b-container>
      <b-row align-h="center">
        <b-col sm="8">
          <br>
          <b-alert show variant="warning">Are you sure you want to logout?</b-alert>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col sm=8>
          <b-container>
            <b-row align-h="between">
              <b-col sm="0">
                <b-button @click="back" variant="outline-primary">Cancel</b-button>
              </b-col>
              <b-col sm="0">
                <b-button @click="logout" variant="danger">Yes</b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';

@Component({
  methods: {
    back() {
      this.$router.back();
    },
    deleteUser() {
      localStorage.removeItem('user');
      this.$store.commit('removeUser');
    },
    deleteToken() {
      localStorage.removeItem('token');
      this.$store.commit('removeToken');
    },
    async logout() {
      let dummyCondition = true;
      // Siempre da error '401'.
      Axios.get(`${this.$store.state.apis.authentication.base}/logout`, { headers: { token: localStorage.token } }).then((res) => {
        res.data.message = 'Dummy operation';
        dummyCondition = true;
      }).catch((error) => {
        error.response.data.message = 'Dummy operation';
        dummyCondition = true;
      });

      // Al no saber que esperar del servidor siempre ejecuto la eliminación del token y la información del usuario.
      if (dummyCondition) {
        // @ts-ignore
        this.deleteToken();
        // @ts-ignore
        this.deleteUser();

        this.$router.push({ path: '/login' });
        this.$router.go(0);
      }
    },
  },
})
export default class Logout extends Vue {}
</script>
