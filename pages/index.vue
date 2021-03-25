<template>
  <v-row justify="center" align="center" class="background">
    <v-col
      cols="11" sm="10" md="8" lg="7"
      v-for="article in articles"
      :key="article.slug"
    >
      <article-card :article="article"></article-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Vue, Component } from "nuxt-property-decorator";
const ArticleCard = () => import("@/components/ArticleCard.vue");
import { IContentDocument } from "@nuxt/content/types/content";

@Component({
  components: {
    ArticleCard,
  }
})
export default class IndexPage extends Vue {
  async asyncData({ $content }: Context): Promise<{ articles: IContentDocument | IContentDocument[] }> {
    const articles = await $content('articles')
      .only(['title', 'slug', 'tags', 'createdAt'])
      .sortBy('createdAt', 'asc')
      .fetch();
    return { articles };
  }
}
</script>

<style scoped>
.background {
  width: 100%;
  overflow: hidden;
}

main {
  margin-top: 0px;
}
</style>