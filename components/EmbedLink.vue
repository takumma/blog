<template>
  <v-card class="embed-link" outlined rounded="lg" :href="src">
    <div class="link">
      <h1 class="title">{{ data.title }}</h1>
      <div class="others">
        <p>{{ data.description }}</p>
        <p>{{ hostName(src) }}</p>
      </div>
    </div>
    <div v-if="data.image" class="img-wrapper">
      <img :src="data.image" :alt="data.title" class="ogp-img" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

interface Link {
  title: string
  description: string
  url: string
  image: string
  siteName: string
  twitterCard: string
}

@Component
export default class EmbedLink extends Vue {
  @Prop({ type: String, required: true })
  src!: string

  data: Link = {
    title: '',
    description: '',
    url: '',
    image: '',
    siteName: '',
    twitterCard: '',
  }

  async mounted() {
    try {
      const resp = await this.$axios.$get(
        `.netlify/functions/embed-link?url=${this.src}`
      )
      this.data = resp
    } catch (err) {}
  }

  hostName = (url: string) => url.split('/')[2]
}
</script>

<style scoped>
.v-card {
  display: flex;
}

.embed-link {
  margin: 2rem 0px;
  height: 120px;
  overflow: hidden;
}

.link {
  flex: 1;
  padding: 0.8rem 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}

.title {
  font-size: 1rem;
  margin: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0.3rem;
  border: none !important;
}

.others p {
  color: #777;
  margin-bottom: 0 !important;
  padding-top: 0em;
  padding-bottom: 0.1em;
}

.img-wrapper {
  height: 120px;
  width: 120px;
}

.ogp-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
</style>
