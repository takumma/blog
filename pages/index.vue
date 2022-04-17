<template>
  <v-row justify="center" align="center" class="background">
    <v-col
      v-for="article in articles"
      :key="article.slug"
      cols="11"
      sm="10"
      md="8"
      lg="7"
    >
      <article-card :article="article"></article-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'nuxt-property-decorator'
import { FetchReturn } from '@nuxt/content/types/query-builder'
const ArticleCard = () => import('@/components/ArticleCard.vue')

@Component({
  components: {
    ArticleCard,
  },
})
export default class IndexPage extends Vue {
  async asyncData({
    $content,
  }: Context): Promise<{ articles: FetchReturn | FetchReturn[] }> {
    const articles = await $content('articles')
      .only(['title', 'slug', 'tags', 'date'])
      .sortBy('date', 'desc')
      .fetch()
    return { articles }
  }
}
</script>

<style scoped>
.background {
  width: 100%;
  overflow: hidden;
}
</style>
