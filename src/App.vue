<template>
  <div class="app">
    <b-navbar v-if="user" toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">Prueba técnica - RedCapital</b-navbar-brand>
      
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">{{ user.email }}</b-dropdown-item>
          <b-dropdown-item to="/logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState(['user']),
  beforeCreate() {
    // Check on the 'localStorage' if the keys: ['token', 'user'] exist.
    if((localStorage.token !== undefined) && (localStorage.user !== undefined)) {
      // Use the data saved on the 'localStorage'
      this.$store.commit('setToken', localStorage.token);
      this.$store.commit('setUser', JSON.parse(localStorage.user));
      console.log('Using data from a saved session');
    } else {
      console.log('Data from a previous session does not exist');
    }
  },
  beforeMount() {
    if (this.$store.state.token === null && this.$store.state.user === null && this.$route.path !== '/login') {
      this.$router.push({ path: '/login' });
    }
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
