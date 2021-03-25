<template>
  <v-card class="article-card" rounded="lg">
    <v-card-text class="pb-0">
      {{ formatedDate(article.createdAt) }}
    </v-card-text>
    <v-card-title class="py-0">
      <nuxt-link :to="article.slug" class="article-title">
        {{ article.title }}
      </nuxt-link>
    </v-card-title>
    <v-row class="px-3 pb-3">
      <v-col
        v-for="tag in article.tags"
        :key="tag"
        class="py-1 px-1"
      >
        <tag-tip :tag="tag"></tag-tip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { IContentDocument } from "@nuxt/content/types/content";
const TagTip = () => import('@/components/TagTip.vue')

@Component({
  components: {
    TagTip,
  }
})
export default class ArticleCard extends Vue {
  @Prop({ required: true })
  article: IContentDocument | undefined;

  formatedDate(date: string) {
    if(date) return date.slice(0, 10).replace(/-/g, '/');
  }
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
