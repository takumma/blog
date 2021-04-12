<template>
  <div class="embed-link">
    {{ src }}
    {{ data }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

interface Link {
  title: string;
  description: string;
  url: string;
  image: string;
}

@Component
export default class EmbedLink extends Vue {
  @Prop({ type: String, required: true })
  src!: string;

  data: Link = {
    title: "",
    description: "",
    url: "",
    image: "",
  }

  async mounted() {
    try {
      const resp = await this.$axios.$get('.netlify/functions/embed-link')
      console.log('resp')
      console.log(process.env.baseURL)
      this.data = resp
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
.youtube {
  width: 100%;
  max-width: 640px;
  padding: 2rem 0px;
}
</style>
