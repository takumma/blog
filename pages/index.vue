<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-row>
        <v-col
          v-for="article in articles"
          :key="article.slug"
          cols="12"
        >
        <article-card :article="article"></article-card>
        </v-col>
      </v-row>
      {{ articles }}
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Vue, Component } from "nuxt-property-decorator";
import ArticleCard from "@/components/ArticleCard.vue";
import { IContentDocument } from "@nuxt/content/types/content";

@Component({
  components: {
    ArticleCard,
  }
})
export default class IndexPage extends Vue {
  async asyncData({ $content }: Context): Promise<{ articles: IContentDocument | IContentDocument[] }> {
    const articles = await $content('articles')
      .only(['title', 'description', 'slug', 'tags'])
      .sortBy('createdAt', 'asc')
      .fetch();
    return { articles };
  }
}
</script>

<style scoped>

</style>