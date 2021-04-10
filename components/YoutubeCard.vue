<template>
  <div>
    <youtube :video-id="id" class="youtube"></youtube>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class TweetCard extends Vue {
  @Prop({ type: String, required: true })
  id!: string;
}
</script>

<style>
.youtube {
  width: 100%;
  max-width: 640px;
  padding: 2rem 0px;
}
</style>
