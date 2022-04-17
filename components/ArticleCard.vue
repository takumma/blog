<template>
  <nuxt-link :to="article.slug">
    <v-card class="article-card" rounded="lg">
      <v-card-text class="pb-0">
        {{ article.date }}
      </v-card-text>
      <v-card-title class="py-0 article-title">
        {{ article.title }}
      </v-card-title>
      <div class="px-3 pb-3">
        <tag-tip
          v-for="tag in article.tags"
          :key="tag"
          class="my-1 mr-2"
          :tag="tag"
        ></tag-tip>
      </div>
    </v-card>
  </nuxt-link>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
const TagTip = () => import('@/components/TagTip.vue')

@Component({
  components: {
    TagTip,
  },
})
export default class ArticleCard extends Vue {
  @Prop({ required: true })
  article: FetchReturn | undefined
}
</script>

<style>
.v-application a {
  text-decoration: none;
}

.v-application .article-title {
  font-weight: 700;
  color: #263238;
}
</style>
