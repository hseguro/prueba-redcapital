<template>
  <div class="posts">
    <b-container>
      <b-row align-h="center">
        <b-col v-if="posts === null" md="6" offset-md="4">
          <br>
					<p v-if="error">No se pueden cargar los posts</p>
					<b-spinner v-if="!error" variant="primary" label="Spinning"></b-spinner>
        </b-col>
      </b-row>
			<b-row v-if="posts !== null">
        <b-col md="4" :key="post.id" v-for="post in posts">
					<br>
					<Post :post="post"></Post>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import { mapState } from 'vuex';
import Post from '@/components/Post.vue';

@Component({
	computed: mapState(['posts']),
	data() {
		return {
			error: false,
		};
	},
  beforeCreate() {
		// I use the token to emulate a real request
		Axios.get(`${this.$store.state.apis.posts.base}/posts`, {
			params: {
				token: this.$store.state.token,
			},
		}).then((res) => {
			this.$store.commit('setPosts', res.data);
		}).catch((error) => {
			this.$data.error = true;
		});
	},
	components: {
		Post,
	},
})
export default class Home extends Vue {}
</script>
