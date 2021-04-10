<template>
  <div class="embed-link">
    {{ src }}
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class EmbedLink extends Vue {
  @Prop({ type: String, required: true })
  src!: string;

}
</script>

<style>
.youtube {
  width: 100%;
  max-width: 640px;
  padding: 2rem 0px;
}
</style>
