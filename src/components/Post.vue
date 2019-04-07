<template>
  <div class="post-card">
    <b-card
      :title="post.title"
      img-src="http://lorempixel.com/400/200/business/"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2">
      <b-card-text>{{ post.body }}</b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Post extends Vue {
  @Prop() private post!: object;
}
</script>