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
        <b-col md="3" :key="post.id" v-for="post in posts">
					<br>
					<b-card
						:title="post.title"
						img-src="http://lorempixel.com/400/200/business/"
						img-alt="Image"
						img-top
						tag="article"
						style="max-width: 20rem;"
						class="mb-2"
					>
						<b-card-text>{{ post.body }}</b-card-text>
					</b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import { mapState } from 'vuex';

@Component({
	computed: mapState(['posts']),
	data() {
		return {
			error: false,
		};
	},
  beforeCreate() {
		Axios.get(`${this.$store.state.apis.posts.base}/posts`).then((res) => {
			this.$store.commit('setPosts', res.data);
		}).catch((error) => {
			this.$data.error = true;
		});
  },
})
export default class Home extends Vue {}
</script>
