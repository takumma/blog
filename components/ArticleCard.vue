<template>
  <v-card class="article-card" rounded="lg">
    <v-card-text class="pb-0">
      {{ article.date }}
    </v-card-text>
    <v-card-title class="py-0">
      <nuxt-link :to="article.slug" class="article-title">
        {{ article.title }}
      </nuxt-link>
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
